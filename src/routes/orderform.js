import express from "express";
import prisma from "../config/prisma.js";
import multer from "multer";
import logger from "../config/logger.js";
import { getTemplatesByUserId } from "../services/templateService.js";

const router = express.Router();

/* GET orderform page. */
router.get("/", async (req, res, next) => {
  try {
    const packages = await prisma.package.findMany({
      where: {
        category: { equals: "Package" },
      },
    });
    const refrigerators = await prisma.package.findMany({
      where: {
        category: { equals: "Refrigerator" },
      },
    });
    const w_ds = await prisma.package.findMany({
      where: {
        category: { equals: "Washer/Dryer" },
      },
    });

    const templates = await getTemplatesByUserId(req.currentUser.id);

    res.render("orderform", {
      packages,
      refrigerators,
      w_ds,
      templates,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
});

export default router;
