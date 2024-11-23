import express from "express";
import prisma from "../../config/prisma.js";
import multer from "multer";
import logger from "../../config/logger.js";

const router = express.Router();
const upload = multer();

// Create item
router.post("/", upload.none(), async (req, res) => {
  try {
    const { product_number, description, category } = req.body;
    const item = await prisma.item.create({
      data: { product_number, description, category },
    });
    res.json(item);
  } catch (error) {
    logger.error(error);
    if (error.code === "P2002") {
      res.status(400).send({ message: "Item already exists" });
    } else {
      res.status(400).send({ message: "An error occurred. Please try again." });
    }
  }
});

// Update item
router.put("/:id", async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id);
    const { product_number, description } = req.body;

    const item = await prisma.item.update({
      where: { id: itemId },
      data: { product_number, description },
    });
    res.json(item);
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

// Delete item
router.delete("/:id", async (req, res, next) => {
  try {
    const itemId = parseInt(req.params.id);
    await prisma.item.delete({
      where: { id: itemId },
    });
    res.status(200).json({ message: "Item was deleted" });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default router;
