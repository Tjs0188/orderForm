const puppeteer = require("puppeteer")
var express = require('express');
var router = express.Router();
const pug = require('pug')

router.post("/", async (req, res) => {
  let filename = "Frigidare Order Form";

  filename = encodeURIComponent(filename) + '.pdf';
  var bodyContent = req.body;

  const htmlContent = pug.renderFile('views/templates/pdf.pug', {bodyContent})

  // Launch Puppeteer and generate the PDF
  const browser = await puppeteer.launch({
    headless: true, 
    args: ['--no-sandbox', '--disable-setuid-sandbox'] // These args help in some environments
  });
  const [page] = await browser.pages();

  // Set the content of the page to the HTML rendered from Pug
  await page.setContent(htmlContent, {waitUntil: "load"});
  await page.addStyleTag({ path: 'public/styles/style.css' }) 

  // Generate the PDF from the page's content
  const pdfBuffer = await page.pdf({
    format: 'LETTER',
    printBackground: true,
    margin: {top: "50px", bottom: "50px", left: "50px", right: "50px"}
  });

  
  await browser.close();

  // Set the headers to download the file
  res.contentType("application/pdf")
  res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
  // End the PDF buffer as the response
  res.end(pdfBuffer);
});

module.exports = router;
