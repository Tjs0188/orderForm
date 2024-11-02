import puppeteer from "puppeteer";
import express from "express";
import pug from "pug";
import path from "path";

const router = express.Router();

router.post("/", async (req, res) => {
  let filename = "Frigidare Order Form";
  filename = encodeURIComponent(filename) + ".pdf";
  const bodyContent = req.body;

  // Format items for package, fridge, and washer/dryer
  const packageItems = formatItems(bodyContent, "packageItem");
  const fridgeItems = formatItems(bodyContent, "frgItem");
  const w_dItems = formatItems(bodyContent, "wdItem");

  // Render HTML content using Pug template
  const htmlContent = pug.renderFile("views/templates/pdf.pug", {
    bodyContent,
    packageItems,
    fridgeItems,
    w_dItems,
  });

  // Launch Puppeteer and generate the PDF
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"], // These args help in some environments
  });
  const [page] = await browser.pages();

  // Set the content of the page to the HTML rendered from Pug
  await page.setContent(htmlContent, { waitUntil: "networkidle0" });
  await page.addStyleTag({ path: path.resolve("public/styles/style.css") });

  // Generate the PDF from the page's content
  const pdfBuffer = await page.pdf({
    format: "LETTER",
    printBackground: true,
    margin: { top: "50px", bottom: "50px", left: "0px", right: "0px" },
  });

  await browser.close();

  // Set the headers to download the file
  res.contentType("application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=${filename}`);
  // End the PDF buffer as the response
  res.end(pdfBuffer);
});

// Helper function to format items into objects
function formatItems(bodyContent, prefix) {
  const categories = bodyContent[`${prefix}[category][]`] || [];
  const productNumbers = bodyContent[`${prefix}[product_number][]`] || [];
  const descriptions = bodyContent[`${prefix}[description][]`] || [];

  // Create an array of objects from the parallel arrays
  return categories.map((category, index) => ({
    category,
    product_number: productNumbers[index] || "",
    description: descriptions[index] || "",
  }));
}

export default router;
