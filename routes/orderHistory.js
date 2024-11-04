import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/* GET order histories listings. */
router.get("/", async (_req, res, next) => {
  try {
    const orders = await prisma.orderHistory.findMany();

    res.render("orderHistory", {
      title: "Order Form - History",
      orders,
    });
  } catch (error) {
    next(error);
  }
});

export default router;