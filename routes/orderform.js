import express from "express";
import { PrismaClient } from "@prisma/client";
import multer from "multer";

const router = express.Router();
const prisma = new PrismaClient();
const upload = multer(); // Initialize multer

/* GET users listing. */
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

    const templates = await getTemplatesByUserId(req.user.id);

    res.render("orderform", {
      title: "Order Form",
      packages,
      refrigerators,
      w_ds,
      templates,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/saveTemplate", upload.none(), async (req, res, next) => {
  try {
    const { name, ...data } = req.body;
    console.log(req.body);
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
        user: { connect: { id: req.user.id } },
      },
    });
    res.json({ template });
  } catch (error) {
    if (error.code === "P2002") {
      res.status(400).json({ error: "Template name already exists" });
    }
  }
});

router.get("/templates", async (req, res, next) => {
  try {
    const templates = getTemplatesByUserId(req.user.id);
    res.json({ templates });
  } catch (error) {
    next(error);
  }
});

router.get("/template", async (req, res, next) => {
  try {
    const templateId = parseInt(req.query.templateId);
    const template = await prisma.template.findUnique({
      where: { id: templateId },
    });
    res.json({ template });
  } catch (error) {
    next(error);
  }
});

const getTemplatesByUserId = async (userId) => {
  const templates = await prisma.template.findMany({
    where: {
      userId: { equals: userId },
    },
  });
  return templates;
};

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
