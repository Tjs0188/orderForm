import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();
const prisma = new PrismaClient();

/* GET users listing. */
router.get("/", async (req, res) => {
  res.render("users/index", await getUsers(req));
});

router.get("/edit/:id", (req, res, next) => {
  res.render("users/form", { action: "edit", id: req.params.id });
});

router.post("/edit/:id", async (req, res) => {
  try {
    const data = req.body;
    await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: {
        name: data.name,
        email: data.email,
      },
    });

    res.render("users/index", await getUsers(req));
  } catch (error) {
    console.error(error);
  }
});

const getUsers = async (req) => {
  try {
    const currentPage = parseInt(req.query.page) || 1;
    const rowsPerPage = 10;
    const skip = (currentPage - 1) * rowsPerPage;
    const users = await prisma.user.findMany({ take: rowsPerPage, skip });
    const totalCount = await prisma.user.count();
    return { users, totalCount, currentPage };
  } catch (error) {
    console.error(error);
  }
};

export default router;
