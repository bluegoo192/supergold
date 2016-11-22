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
  spans[i].innerHTML += "  HELLO WORLD";
}

var hercules = new XMLHttpRequest();

hercules.onreadystatechange = function () {
  if (hercules.readyState == XMLHttpRequest.DONE ) {
    if (hercules.status == 200) {
      console.log(hercules.responseText);
    } else if (hercules.status == 400) {
      console.log('ERROR 420!!!');
    } else {
      console.log('Unknown response');
    }
  }
};

hercules.open("GET", "https://localhost:3000/", true);
hercules.send();
// +" length: " + headers.length + " " + document.readyState);
