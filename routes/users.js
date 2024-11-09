import { PrismaClient } from "@prisma/client";
import express from "express";

const router = express.Router();
const prisma = new PrismaClient();

/* GET users listing. */
router.get("/", async (req, res) => {
  const users = await getUsers(req);
  res.render("users/index", { title: "Users", ...users });
});

router.get("/edit/:id", async (req, res, next) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.params.id) },
  });

  res.render("users/form", {
    title: "Users | Edit",
    action: "edit",
    id: req.params.id,
    user,
  });
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
    const users = await getUsers(req);

    res.render("users/index", { title: "Users", ...users });
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
