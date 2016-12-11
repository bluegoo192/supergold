var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var classSchema = mongoose.Schema({
  name: String,
  areas: [String]
});

classSchema.methods.addArea = function(area) {
  this.areas.add(area);
}
classSchema.methods.log = function () {
  console.log(this.name + ", Areas " + this.areas);
}
classSchema.methods.smartSave = function () {

}

function parsePDF(filename) {
  mongoose.connect('mongodb://sgserver:squidserver@ds119788.mlab.com:19788/supergold')
  var GEClass = mongoose.model('GEClass', classSchema);
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
    var lineBreakRegex = /[\n\r]/;
    var lineArray = f.toString().split('\n');//may want to switch line break regex
    //the text parsing is bad, so searching for classes is not easy
    var classRegex = /[\s\W][\s\W]([A-Z][a-z]+\s\s?\s?)+\d+\S*/g;
    var areaRegex = /[eE][aA]\s[A-Z]:/;
    var areaLetterRegex = /[A-Z](?=:)/;
    var classArray = [];
    var latestArea= "";
    for (var i=0; i<lineArray.length; i++) {
      if (areaRegex.test(lineArray[i])) {
        latestArea = areaLetterRegex.exec(lineArray[i])[0];
      }// if we detect mention of an area, store it
      var classMatch = lineArray[i].match(classRegex);
      if ( classMatch ) {
        //console.log(classMatch+" -- AREA "+ latestArea);
        GEClass.findOne({ 'name': classMatch}, 'areas', function(err, thisclass) {
          if (err) return function () {
            console.log("ERROR FINDING CLASS!!!!");
          };
          if (thisclass) {
            thisclass.addArea(latestArea);
            thisClass.save(function (err, cc) {
              if (err) return console.error(err);
              cc.log();
            });
          } else {
            var currentClass = new GEClass({name: classMatch, areas: [latestArea] });
            currentClass.save(function (err, cc) {
              if (err) return console.error(err);
              cc.log();
            });
          }
        });
      }
    }
    //class name regex: [\s\W][\s\W]([A-Z][a-z]+\s\s?\s?)+\d+\S*
    //area regex: [aA]\s[A-Z]:

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
