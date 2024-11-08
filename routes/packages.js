import express from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";

const router = express.Router();
const prisma = new PrismaClient();
const upload = multer(); // Initialize multer

router.post("/", upload.none(), async (req, res) => {
  try {
    const { name, meta, category } = req.body;
    const pkg = await prisma.package.create({
      data: {
        name,
        meta,
        category,
      },
    });

    res.json(pkg);
  } catch (error) {
    console.log(error);
    if (error.code === "P2002") {
      res.status(400).send({ message: "Package already exists" });
    } else {
      res.status(400).send({ message: "An error occurred. Please try again." });
    }
  }
});

router.post("/items", upload.none(), async (req, res) => {
  try {
    const { product_number, description, category } = req.body;
    const item = await prisma.item.create({
      data: {
        product_number,
        description,
        category,
      },
    });

    res.json(item);
  } catch (error) {
    console.log(error);
    if (error.code === "P2002") {
      res.status(400).send({ message: "Item already exists" });
    } else {
      res.status(400).send({ message: "An error occurred. Please try again." });
    }
  }
});

router.get("/edit", async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    const itemCategories = getItemCategories(items);

    const packages = await prisma.package.findMany();
    const packageCategories = getPackageCategories(packages);

    res.render("packages/form", {
      title: "Maintain Packages",
      items,
      itemCategories,
      packages,
      packageCategories,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ message: "An error occurred. Please try again." });
  }
});

router.get("/packageItems", async (req, res, next) => {
  try {
    const packageId = parseInt(req.query.packageId);
    const packageItems = await prisma.packageItem.findMany({
      where: {
        package_id: { equals: packageId },
      },
      include: {
        package: true,
        item: true,
      },
      orderBy: { priority: "asc" },
    });

    res.json({ packageItems });
  } catch (error) {
    next(error);
  }
});

router.put("/packageItems/:id", async (req, res, next) => {
  try {
    const packageItemId = parseInt(req.params.id);
    const priority = parseInt(req.body.priority);

    const packageItem = await prisma.packageItem.update({
      where: {
        id: packageItemId,
      },
      data: {
        priority,
      },
    });

    res.json(packageItem);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/addItem", async (req, res, next) => {
  const packageId = parseInt(req.body.package_id);
  const itemId = parseInt(req.body.item_id);
  const priority = req.body.priority;

  try {
    const highestPriority = await prisma.packageItem.aggregate({
      where: {
        package_id: { equals: packageId },
      },
      _max: {
        priority: true,
      },
    });
    const nextPriority = highestPriority._max.priority + 1;
    const packageItem = await prisma.packageItem.create({
      data: {
        package_id: packageId,
        item_id: itemId,
        priority: parseInt(priority || nextPriority),
      },
      include: {
        package: {
          include: {
            items: true,
          },
        },
        item: true,
      },
    });

    res.json(packageItem);
  } catch (error) {
    console.log(error);
    if (error.code === "P2002") {
      res.status(400).send({ message: "Item already exists in package" });
    } else if (!itemId) {
      res.status(400).send({ message: "Item is required" });
    } else if (!packageId) {
      res.status(400).send({ message: "Package is required" });
    }
  }
});

const getItemCategories = (items) => {
  if (!items) return [];

  return Array.from(
    new Set(
      items
        .map((item) => item.category.toLowerCase())
        .filter((category) => category.trim() !== "")
    )
  )
    .map((category) => category.charAt(0).toUpperCase() + category.slice(1))
    .sort();
};

const getPackageCategories = (packages) => {
  if (!packages) return [];

  return Array.from(
    new Set(
      packages
        .map((pkg) => pkg.category.toLowerCase())
        .filter((category) => category.trim() !== "")
    )
  )
    .map((category) => category.charAt(0).toUpperCase() + category.slice(1))
    .sort();
};

export default router;
