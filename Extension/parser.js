console.log("test 2");
//prints "test 2" to console"
var headers = document.getElementsByClassName("tableheader");
/*while (!headers || headers.length == 0) {
  var headers = document.getElementByClassName("tableheader");
  }*/
//may be necessary so kept commented out just in case


var spans = [];
//stores the nodes that keep the class information

for (var i=0; i<headers.length; i++) {
    //goes through and gets the class information from the headers array
  if (headers[i].nodeName === "SPAN") {
    spans.push(headers[i]);
  }
}

for (var i=0; i<spans.length; i++) {
    //prints out the class names to the console
  console.log(spans[i].innerText);
  //adds the string "HELLO WORLD" behind every class name
  spans[i].innerHTML += "  HELLO WORLD";
}
