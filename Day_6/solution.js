const fs = require("fs");

const splitInput = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split("\r\n");

var markerAppears = [];

splitInput.forEach((line) => {
  var markerFound = false;
  for (var i = 0; i < line.length - 4; i++) {
    if (markerFound) {
      break;
    }
    const inLineLettes = line.substring(i, i + 4);
    markerFound = true;
    for (var j = 0; j < inLineLettes.length - 1; j++) {
      const regex = inLineLettes[j];
      const regexObj = new RegExp(regex, "g");
      const lettersMatch = inLineLettes.match(regexObj);
      if (lettersMatch.length > 1) {
        markerFound = false;
        break;
      }
    }
    if (markerFound) {
      markerAppears.push(i + 4);
    }
  }
});
console.log(
  `The first start-of-packet marker is detected after: ${markerAppears} characters`
);
