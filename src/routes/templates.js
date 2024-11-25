import express from "express";
import prisma from "../config/prisma.js";
import multer from "multer";
import logger from "../config/logger.js";
import odbc from "odbc";
import { getUserTemplates } from "../services/templateService.js";

const router = express.Router();
const upload = multer(); // Initialize multer

const readAccdbTable = async (filePath, tableName) => {
  const connectionString = `Driver={Microsoft Access Driver (*.mdb, *.accdb)};Dbq=${filePath};`;
  const connection = await odbc.connect(connectionString);

  const result = await connection.query(`SELECT * FROM ${tableName}`);
  await connection.close();
  return result;
};

router.post("/", upload.none(), async (req, res, next) => {
  try {
    const { name, ...data } = req.body;
    logger.info(req.body);
    const template = await prisma.template.create({
      data: {
        name,
        contact_name: data.contactName,
        delivery_phone: data.deliveryPhone,
        contact_email: data.contactEmail,
        deliv_date: data.requestDeliveryDate,
        quote_num: data.quoteNumber,
        address: data.address,
        lot_block: data.lotBlock,
        city: data.city,
        state: data.state,
        zip: data.zip,
        proj_name: data.projectName,
        acc_num: data.accountNumber,
        user: { connect: { id: req.currentUser.id } },
      },
    });
    res.json({ template });
  } catch (error) {
    logger.error(error);
    if (error.code === "P2002") {
      res.status(400).json({ error: "Template name already exists" });
    }
  }
});

router.get("/", async (req, res, next) => {
  try {
    res.render("userTemplates", await getUserTemplates(req));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const templateId = parseInt(req.params.id);
    const template = await prisma.template.findUnique({
      where: { id: templateId },
    });
    res.json({ template });
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const templateId = parseInt(req.params.id);
    await prisma.template.delete({
      where: {
        id: templateId,
        userId: req.currentUser.id,
      },
    });

    res.status(200).json(await getUserTemplates(req));
  } catch (error) {
    next(error);
  }
});

export default router;
