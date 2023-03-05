const fs = require("fs");

const puzzleInput = fs
  .readFileSync(`${__dirname}/puzzleInput`)
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n");

const puzzleGrid = fs
  .readFileSync(`${__dirname}/puzzleInput`)
  .toString()
  .replace(/\r/g, "")
  .trim()
  .split("\n")
  .map((line) => [...line].map(Number));

function prepareTheGrid() {
  const gridBoard = [];
  puzzleInput.forEach((line) => {
    const lineGrid = [];
    for (var i = 0; i < line.length; i++) {
      lineGrid.push(parseInt(line[i]));
    }
    gridBoard.push(lineGrid);
  });
  return gridBoard;
}

function addToAreVisable(lineY, columnX, areVisable) {
  areVisable.push(`(${columnX},${lineY})`);
  //areVisable.push(parseInt(`${columnX}${lineY}`)); ! WRONG OUTPUT AT THE END !
}

function checkLineInDirection(
  lineY,
  columnX = 0,
  dy,
  dx,
  gridBoard,
  areVisable
) {
  addToAreVisable(lineY, columnX, areVisable);
  let theHighestTree = gridBoard[lineY][columnX];
  while (true) {
    lineY += dy;
    columnX += dx;
    if (
      lineY < 0 ||
      lineY >= gridBoard.length ||
      columnX < 0 ||
      columnX >= gridBoard[lineY].length
    ) {
      break;
    }
    if (gridBoard[lineY][columnX] > theHighestTree) {
      addToAreVisable(lineY, columnX, areVisable);
      theHighestTree = gridBoard[lineY][columnX];
    }
  }
}

(function () {
  const gridBoard = puzzleGrid;
  //   console.log("gridBoard", gridBoard);
  const areVisable = [];

  //   checkLineInDirection(4, 2, -1, 0, gridBoard, areVisable);

  for (let c = 0; c < gridBoard[0].length; c++) {
    checkLineInDirection(0, c, 1, 0, gridBoard, areVisable);
    checkLineInDirection(gridBoard.length - 1, c, -1, 0, gridBoard, areVisable);
  }

  for (let r = 0; r < gridBoard.length; r++) {
    checkLineInDirection(r, 0, 0, 1, gridBoard, areVisable);
    checkLineInDirection(
      r,
      gridBoard[0].length - 1,
      0,
      -1,
      gridBoard,
      areVisable
    );
  }
  const areVisableSet = new Set(areVisable);
  console.log(
    `\nPART_1: ${areVisableSet.size} trees are visible from outside the grid\n`
  );
})();
