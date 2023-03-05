const fs = require("fs");

const puzzleInput = fs
  .readFileSync(`${__dirname}/testInput`)
  .toString()
  .replace(/\r/g, "")
  .split("\n");

// console.log("puzzleInput", puzzleInput);

const gridBoard = [];
puzzleInput.forEach((line) => {
  const lineGrid = [];
  for (var i = 0; i < line.length - 1; i++) {
    lineGrid.push(parseInt(line[i]));
  }
  gridBoard.push(lineGrid);
});

console.log("gridBoard", gridBoard);
