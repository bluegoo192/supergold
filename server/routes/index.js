var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var classSchema = mongoose.Schema({
  name: String,
  areas: [String]
});

function parsePDF(filename) {
  mongoose.connect('mongodb://sgserver:squidserver@ds119788.mlab.com:19788/supergold')
  var fs = require('fs'),
    PDFParser = require("pdf2json");
  var pdfParser = new PDFParser(this, 1);
  pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
  pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile("./data/"+filename+".txt", pdfParser.getRawTextContent());
  });
  pdfParser.loadPDF("./data/"+filename+".pdf");

  //parse text into array
  var fs = require('fs');
  fs.readFile("./data/"+filename+".txt", function(err, f) {
    var lineArray = f.toString().split('\n');
    console.log(lineArray);
    //the text parsing is bad, so searching for classes is not easy
    var classRegex = /[\s\W][\s\W]([A-Z][a-z]+\s\s?\s?)+\d+\S*/g;
    var classArray = [];
    for (int i=0; i<lineArray.length; i++) {

    }
    //class name regex: [\s\W][\s\W]([A-Z][a-z]+\s\s?\s?)+\d+\S*

  });
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
