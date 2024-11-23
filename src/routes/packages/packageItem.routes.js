import express from "express";
import prisma from "../../config/prisma.js";
import logger from "../../config/logger.js";

const router = express.Router();

// Get package items
router.get("/", async (req, res, next) => {
  try {
    const packageId = parseInt(req.query.packageId);
    const packageItems = await prisma.packageItem.findMany({
      where: { package_id: { equals: packageId } },
      include: { package: true, item: true },
      orderBy: { priority: "asc" },
    });
    res.json({ packageItems });
  } catch (error) {
    next(error);
  }
});

// Update package item
router.put("/:id", async (req, res, next) => {
  try {
    const packageItemId = parseInt(req.params.id);
    const priority = parseInt(req.body.priority);

    const packageItem = await prisma.packageItem.update({
      where: { id: packageItemId },
      data: { priority },
    });
    res.json(packageItem);
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

// Add item to package
router.post("/", async (req, res, next) => {
  const packageId = parseInt(req.body.package_id);
  const itemId = parseInt(req.body.item_id);
  const priority = req.body.priority;

  try {
    const highestPriority = await prisma.packageItem.aggregate({
      where: { package_id: { equals: packageId } },
      _max: { priority: true },
    });

    const nextPriority = highestPriority._max.priority + 1;
    const packageItem = await prisma.packageItem.create({
      data: {
        package_id: packageId,
        item_id: itemId,
        priority: parseInt(priority || nextPriority),
      },
      include: {
        package: { include: { items: true } },
        item: true,
      },
    });
    res.json(packageItem);
  } catch (error) {
    logger.error(error);
    if (error.code === "P2002") {
      res.status(400).send({ message: "Item already exists in package" });
    } else if (!itemId) {
      res.status(400).send({ message: "Item is required" });
    } else if (!packageId) {
      res.status(400).send({ message: "Package is required" });
    }
  }
});

export default router;
