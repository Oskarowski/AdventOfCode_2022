const fs = require("fs");

const puzzleInput = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .replace(/\r/g, "")
  .split("\n");

// console.log(puzzleInput);

var head = { x: 0, y: 0 };
var tail = { x: 0, y: 0 };
var tailVisited = []; // at the end do set from it to get unique visited positions
var tailSet = new Set();

const commandRegex = /(?<direction>[A-Z]) (?<amount>\d+)/g;

puzzleInput.forEach((commandEntry) => {
  //   console.log(commandEntry);
  var direction;
  var amount;
  for (const match of commandEntry.matchAll(commandRegex)) {
    // console.log(match);
    direction = match.groups.direction;
    amount = match.groups.amount;
  }

  for (var moves = 0; moves < Number(amount); moves++) {
    switch (direction) {
      case "U":
        head.y++;
        break;
      case "R":
        head.x++;
        break;
      case "D":
        head.y--;
        break;
      case "L":
        head.x--;
        break;
    }

    const distance = Math.sqrt(
      Math.pow(Math.abs(head.x - tail.x), 2) +
        Math.pow(Math.abs(head.y - tail.y), 2)
    );
    // console.log("distance", distance);
    if (distance > 2) {
      const toTheRight = head.x - tail.x > 0 ? true : false;
      const toTheUp = head.y - tail.y > 0 ? true : false;

      if (toTheRight && toTheUp) {
        tail.x++;
        tail.y++;
      } else if (toTheRight === false && toTheUp === false) {
        tail.x--;
        tail.y--;
      } else if (toTheRight === true && toTheUp === false) {
        tail.x++;
        tail.y--;
      } else if (toTheRight === false && toTheUp === true) {
        tail.x--;
        tail.y++;
      }
    } else if (distance === 2) {
      switch (direction) {
        case "U":
          tail.y++;
          break;
        case "R":
          tail.x++;
          break;
        case "D":
          tail.y--;
          break;
        case "L":
          tail.x--;
          break;
      }
    }
    tailVisited.push([tail.x, tail.y]);
    tailSet.add(`${tail.x},${tail.y}`);
    // console.log("head", head);
    // console.log("tail", tail);
  }
});
//const set2 = new Set(arr2.map(obj => obj.letter));
// console.log("tailVisited", tailVisited);
// console.log("tailSet", tailSet);
console.log(
  `So, there are ${tailSet.size} positions the tail visited at least once.`
);
