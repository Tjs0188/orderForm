import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  res.render("packages/index", await getPackages(req));
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
