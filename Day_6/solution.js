const fs = require("fs");

const splitInput = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split("\r\n");

const packetMarkerAppears = [];

splitInput.forEach((line) => {
  var markerFound = false;
  for (var i = 0; i < line.length - 4; i++) {
    if (markerFound) {
      break;
    }
    const inLineLettes = line.substring(i, i + 4);
    markerFound = true;
    for (var j = 0; j < inLineLettes.length; j++) {
      const regexp = inLineLettes[j];
      const regexObj = new RegExp(regexp, "g");
      const lettersMatch = inLineLettes.match(regexObj);
      if (lettersMatch.length > 1) {
        markerFound = false;
        break;
      }
    }
    if (markerFound) {
      packetMarkerAppears.push(i + 4);
    }
  }
});
console.log(
  `The first start-of-packet marker is detected after: ${packetMarkerAppears} characters`
);
// PART 2
const messageMarkerAppears = [];
splitInput.forEach((line) => {
  var messageMarkerFound = false;
  for (var i = 0; i < line.length - 14; i++) {
    if (messageMarkerFound) {
      break;
    }
    const inLineLettes = line.substring(i, i + 14);
    for (var j = 0; j < inLineLettes.length; j++) {
      const regexp = inLineLettes[j];
      messageMarkerFound = true;
      const regexObj = new RegExp(regexp, "g");

      const lettersMatch = inLineLettes.match(regexObj);

      if (lettersMatch.length > 1) {
        messageMarkerFound = false;
        break;
      }
    }
    if (messageMarkerFound) {
      messageMarkerAppears.push(i + 14);
    }
  }
});
console.log(
  `The first start-of-message marker is detected after: ${messageMarkerAppears} characters`
);
