var express = require('express');
var router = express.Router();

//PDF Parsing stuff.  will be moved later
var fs = require('fs'),
  PDFParser = require("pdf2json");
var pdfParser = new PDFParser(this, 1);
pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
  fs.writeFile("pdf.content.txt", pdfParser.getRawTextContent());
});

/* GET home page. */
router.get('/', function(req, res, next) {
  pdfParser.loadPDF("gear-2016-17.pdf");
  res.render('index', { title: 'Express' });
});

module.exports = router;
