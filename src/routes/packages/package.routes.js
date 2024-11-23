import express from "express";
import prisma from "../../config/prisma.js";
import multer from "multer";
import logger from "../../config/logger.js";
import {
  getItemCategories,
  getPackageCategories,
} from "../utils/categoryHelpers.js";

const router = express.Router();
const upload = multer();

// Create package
router.post("/", upload.none(), async (req, res) => {
  try {
    const { name, meta, category } = req.body;
    const pkg = await prisma.package.create({
      data: { name, meta, category },
    });
    res.json(pkg);
  } catch (error) {
    logger.error(error);
    if (error.code === "P2002") {
      res.status(400).send({ message: "Package already exists" });
    } else {
      res.status(400).send({ message: "An error occurred. Please try again." });
    }
  }
});

// Get packages edit page
router.get("/edit", async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    const packages = await prisma.package.findMany();

    res.render("packages/form", {
      title: "Maintain Packages",
      items,
      itemCategories: getItemCategories(items),
      packages,
      packageCategories: getPackageCategories(packages),
    });
  } catch (error) {
    logger.error(error);
    res.status(400).send({ message: "An error occurred. Please try again." });
  }
});

// Update package
router.put("/:id", async (req, res, next) => {
  try {
    const packageId = parseInt(req.params.id);
    const { name, meta } = req.body;

    const pkg = await prisma.package.update({
      where: { id: packageId },
      data: { name, meta },
    });
    res.json(pkg);
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

// Delete package
router.delete("/:id", async (req, res, next) => {
  try {
    const packageId = parseInt(req.params.id);
    await prisma.package.delete({
      where: { id: packageId },
    });
    res.status(200).json({ message: "Package was deleted" });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default router;
