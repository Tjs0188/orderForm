import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  res.render("packages/index", await getPackages(req));
});

router.get("/edit", async (req, res) => {
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
