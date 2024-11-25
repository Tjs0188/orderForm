import puppeteer from "puppeteer";
import express from "express";
import pug from "pug";
import fs from "fs";
import path from "path";
import prisma from "../config/prisma.js";
import crypto from "crypto";
import logger from "../config/logger.js";

const router = express.Router();
const accessTimesPath = path.resolve("./pdf-cache/access-times.json");

function generateCacheKey(obj) {
  const sortedObj = sortObject(obj);
  const jsonString = JSON.stringify(sortedObj);
  return crypto.createHash("md5").update(jsonString).digest("hex");
}

function loadAccessTimes() {
  if (fs.existsSync(accessTimesPath)) {
    return JSON.parse(fs.readFileSync(accessTimesPath, "utf-8"));
  }
  return {};
}

function saveAccessTimes(accessTimes) {
  fs.writeFileSync(accessTimesPath, JSON.stringify(accessTimes, null, 2));
}

function cleanupCache() {
  const accessTimes = loadAccessTimes();
  const files = Object.keys(accessTimes);

  if (files.length > 600) {
    // Sort files by access time
    files.sort((a, b) => accessTimes[a] - accessTimes[b]);

    // Remove the oldest files
    const filesToRemove = files.slice(0, files.length - 600);
    for (const file of filesToRemove) {
      const filePath = path.resolve(`./pdf-cache/${file}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      delete accessTimes[file];
    }

    // Save updated access times
    saveAccessTimes(accessTimes);
  }
}

router.post("/", async (req, res) => {
  let filename = "Frigidare Order Form";
  filename = encodeURIComponent(filename) + ".pdf";
  const bodyContent = req.body;
  createOrderHistory(bodyContent, req.currentUser);

  const [packageCount, fridgeCount, washerDryerCount] = await Promise.all([
    prisma.package.count({ where: { category: "Package" } }),
    prisma.package.count({ where: { category: "Refrigerator" } }),
    prisma.package.count({ where: { category: "Washer/dryer" } }),
  ]);
  const totalPDFs = packageCount * fridgeCount * washerDryerCount;
  const baseUrl = `${req.protocol}://${req.get("host")}`;

  // Generate a hash-based cache key
  const cacheKey = generateCacheKey(bodyContent);
  const pdfPath = path.resolve(`./pdf-cache/${cacheKey}.pdf`);

  // Ensure the cache directory exists
  if (!fs.existsSync(path.dirname(pdfPath))) {
    fs.mkdirSync(path.dirname(pdfPath), { recursive: true });
  }

  const accessTimes = loadAccessTimes();

  if (fs.existsSync(pdfPath)) {
    logger.info({ message: `Serving cached PDF for key: ${cacheKey}` });
    // Update access time
    accessTimes[cacheKey] = Date.now();
    saveAccessTimes(accessTimes);
    // Serve the PDF
    res.contentType("application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.sendFile(pdfPath);
  } else {
    logger.info({ message: `Generating new PDF for key: ${cacheKey}` });

    // Format items as needed
    const packageItems = formatItems(bodyContent, "packageItem");
    const fridgeItems = formatItems(bodyContent, "frgItem");
    const w_dItems = formatItems(bodyContent, "wdItem");

    // Render HTML content using Pug template
    const htmlContent = pug.renderFile("src/views/templates/pdf.pug", {
      bodyContent,
      packageItems,
      fridgeItems,
      w_dItems,
      baseUrl,
    });

    // Launch Puppeteer and generate the PDF
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();

    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    await page.addStyleTag({ path: path.resolve("public/css/style.css") });

    const pdfBuffer = await page.pdf({
      format: "LETTER",
      printBackground: true,
      margin: { top: "10px", bottom: "10px", left: "0px", right: "0px" },
    });

    await page.close();
    await browser.close();

    // Save the PDF to disk
    fs.writeFileSync(pdfPath, pdfBuffer);

    // Serve the PDF
    res.contentType("application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
    res.end(pdfBuffer);
  }
});

// Helper function to sort an object
function sortObject(obj) {
  if (Array.isArray(obj)) {
    return obj.map(sortObject);
  } else if (obj !== null && typeof obj === "object") {
    return Object.keys(obj)
      .sort()
      .reduce((result, key) => {
        result[key] = sortObject(obj[key]);
        return result;
      }, {});
  } else {
    return obj;
  }
}

// Helper function to format items into objects
function formatItems(bodyContent, prefix) {
  const parseIfString = (value) => {
    if (typeof value === "string") {
      return JSON.parse(value);
    }
    return value;
  };

  if (!bodyContent[`${prefix}`]) {
    return [];
  }

  const categories = parseIfString(bodyContent[`${prefix}`].category || []);
  const productNumbers = parseIfString(
    bodyContent[`${prefix}`].product_number || []
  );
  const descriptions = parseIfString(
    bodyContent[`${prefix}`].description || []
  );

  // Create an array of objects from the parallel arrays
  return categories.map((category, index) => ({
    category,
    product_number: productNumbers[index] || "",
    description: descriptions[index] || "",
  }));
}

const createOrderHistory = async (bodyContent, user) => {
  const jsonOrderHistoryData = JSON.stringify(bodyContent);
  const orderHistory = await prisma.orderHistory.create({
    data: {
      orderData: jsonOrderHistoryData,
      user: { connect: { id: user.id } },
    },
  });

  return orderHistory;
};

export default router;
