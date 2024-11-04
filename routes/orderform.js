import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/* GET users listing. */
router.get("/", async (_req, res, next) => {
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

    res.render("orderform", {
      title: "Order Form",
      packages,
      refrigerators,
      w_ds,
    });
  } catch (error) {
    next(error);
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

export default router;
