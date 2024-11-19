import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

/* GET order histories listings. */
router.get("/", async (req, res, next) => {
  const currentPage = parseInt(req.query.page) || 1;
  const rowsPerPage = 20;
  const skip = (currentPage - 1) * rowsPerPage;
  try {
    const [orders, totalCount] = await prisma.$transaction([
      prisma.orderHistory.findMany({
        skip,
        take: rowsPerPage,
        where: { userId: req.currentUser.id },
        orderBy: { createdAt: "desc" },
      }),
      prisma.orderHistory.count({ where: { userId: req.currentUser.id } }),
    ]);

    const formatOrderData = (data) => {
      const obj = JSON.parse(data);
      return Object.entries(obj)
        .map(([key, value]) => `${key}: ${value}`)
        .join("\n");
    };

    const formattedOrders = orders.map((order) => {
      const formattedOrder = {
        ...order,
        formattedOrderData: formatOrderData(order.orderData).replace(
          /\n/g,
          "<br>"
        ),
        createdAt: order.createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      };
      return formattedOrder;
    });

    res.render("orderHistory", {
      title: "History",
      orders: formattedOrders,
      totalCount,
      currentPage,
    });
  } catch (error) {
    next(error);
  }
});

export default router;
