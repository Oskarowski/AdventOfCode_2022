const fs = require("fs");
const puzzleInputSplit = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split("$");
puzzleInputSplit.shift();
puzzleInputSplit.shift();

tree = { "/": null };

var direcotoryRightNow = "/";

console.log("\n");

puzzleInputSplit.forEach((commendLine, whichLine) => {
  commendLine = commendLine.trimStart();
  commendLine = commendLine.replace(/\s{1,}/g, " ");
  console.log("commendLine:", commendLine);
  var commend = commendLine.slice(0, 2);
  commendLine = commendLine.slice(3);
  console.log("commend:", commend);
  console.log("commendLine:", commendLine);
});
