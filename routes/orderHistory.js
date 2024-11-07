import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/* GET order histories listings. */
router.get("/", async (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const rowsPerPage = 10;
  const skip = (currentPage - 1) * rowsPerPage;
  try {
    const [orders, totalCount] = await prisma.$transaction([
      prisma.orderHistory.findMany({
        skip,
        take: rowsPerPage,
        where: { userId: req.user.id },
      }),
      prisma.orderHistory.count({ where: { userId: req.user.id } }),
    ]);

    res.render("orderHistory", {
      title: "History",
      orders,
      totalCount,
      currentPage,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
