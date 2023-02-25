const fs = require("fs");
const puzzleInputSplit = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split("$");
console.log(puzzleInputSplit);
