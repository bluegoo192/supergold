var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Tell server to re-parse pdf.  Should only be used if we've updated the pdf */
/* allows us to update PDF data without restarting the server */
router.get('/refreshGEARtxt', function(req, res, next) {
  var fs = require('fs'),
    PDFParser = require("pdf2json");
  var pdfParser = new PDFParser(this, 1);
  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
  pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile("./data/gear-2016-17.txt", pdfParser.getRawTextContent());
  });
  pdfParser.loadPDF("./data/gear-2016-17.pdf");
});

module.exports = router;
