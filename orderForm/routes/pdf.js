var PDFDocument = require('pdfkit');
var express = require('express');
var router = express.Router();

router.post("/", function(req, res) {
  var doc = new PDFDocument;
  let filename = "Frigidare Order Form";

  filename = encodeURIComponent(filename) + '.pdf';

  res.setHeader('Content-disposition', `attachment; filename="${filename}"`);
  res.setHeader('Content-type', 'application/pdf');

  var bodyContent = req.body;

  // Adjust the starting position of the content in the PDF
  doc.y = 50;
  
  // Iterate through the body properties and add them to the PDF
  Object.keys(bodyContent).forEach(function(key, index) {
    const value = bodyContent[key];
    doc.text(`${key}: ${value}`, 50, doc.y + (index * 5));  // Increase spacing between lines
  });

  // Pipe the document to the response
  doc.pipe(res);

  // Finalize the PDF and send it
  doc.end();
});

module.exports = router;
