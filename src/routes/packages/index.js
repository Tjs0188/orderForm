import express from "express";
import packageRoutes from "./package.routes.js";
import packageItemRoutes from "./packageItem.routes.js";

const router = express.Router();

router.use("/", packageRoutes);
router.use("/packageItems", packageItemRoutes);

export default router;
