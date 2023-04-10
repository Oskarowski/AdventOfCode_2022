const fs = require("fs");

const puzzleInput = fs
  .readFileSync(`${__dirname}/testInput`)
  .toString()
  .replace(/\r/g, "")
  .split("\n");

console.log(puzzleInput);

var headCoordinates = { x: 0, y: 0 };
var tailCoordinates = { x: 0, y: 0 };
const tailVisited = []; // at the end do set from it to get unique visited positions
