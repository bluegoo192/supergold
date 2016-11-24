var express = require('express');
var router = express.Router();

function parsePDF(filename) {
  var fs = require('fs'),
    PDFParser = require("pdf2json");
  var pdfParser = new PDFParser(this, 1);
  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
  pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile("./data/"+filename+".txt", pdfParser.getRawTextContent());
  });
  pdfParser.loadPDF("./data/"+filename+".pdf");
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* Tell server to re-parse pdf.  Should only be used if we've updated the pdf */
/* allows us to update PDF data without restarting the server */
router.get('/refreshGearText', function(req, res, next) {
  parsePDF("gear-2016-17")
  res.send("Finished updating GEAR pdf text data\n");
});

router.get('/refreshLasarText', function(req, res, next) {
  parsePDF("lasar-2015-16")
  res.send("Finished updating LASAR pdf text data\n");
});

module.exports = router;
