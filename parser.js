console.log("test 2");

var headers = document.getElementsByClassName("tableheader");
while (!headers || headers.length == 0) {
  var headers = document.getElementByClassName("tableheader");
}
//console.log(JSON.stringify(headers));

var spans = [];

for (var i=0; i<headers.length; i++) {
  if ("SPAN" === "SPAN") {
    //console.log(headers[i].nodeName);
  }
  if (headers[i].nodeName === "SPAN") {
    spans.push(headers[i]);
  }
}

for (var i=0; i<spans.length; i++) {
  console.log(spans[i].innerText);
}

// +" length: " + headers.length + " " + document.readyState);
