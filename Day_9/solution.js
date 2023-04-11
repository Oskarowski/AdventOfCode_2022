const fs = require("fs");

const puzzleInput = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .replace(/\r/g, "")
  .split("\n");

// console.log(puzzleInput);

var head = { x: 0, y: 0 };
const tailsComp = [
  { id: 1, x: 0, y: 0, visited: [] },
  { id: 2, x: 0, y: 0, visited: [] },
  { id: 3, x: 0, y: 0, visited: [] },
  { id: 4, x: 0, y: 0, visited: [] },
  { id: 5, x: 0, y: 0, visited: [] },
  { id: 6, x: 0, y: 0, visited: [] },
  { id: 7, x: 0, y: 0, visited: [] },
  { id: 8, x: 0, y: 0, visited: [] },
  { id: 9, x: 0, y: 0, visited: [] },
];

const commandRegex = /(?<direction>[A-Z]) (?<amount>\d+)/g;

const moveHead = (direction) => {
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
};

puzzleInput.forEach((commandEntry) => {
  var direction;
  var amount;
  for (const match of commandEntry.matchAll(commandRegex)) {
    direction = match.groups.direction;
    amount = match.groups.amount;
  }

  for (var moves = 0; moves < Number(amount); moves++) {
    moveHead(direction);

    for (var tailId = 0; tailId < tailsComp.length; tailId++) {
      //   console.log("tailId", tailsComp[tailId]);
      const tail = tailsComp[tailId];
      var headCopy;
      if (tailId === 0) headCopy = head;
      else headCopy = tailsComp[tailId - 1];

      const distance = Math.sqrt(
        Math.pow(Math.abs(headCopy.x - tail.x), 2) +
          Math.pow(Math.abs(headCopy.y - tail.y), 2)
      );
      // console.log("distance", distance);

      if (distance > 2) {
        const toTheRight = headCopy.x - tail.x > 0 ? true : false;
        const toTheUp = headCopy.y - tail.y > 0 ? true : false;

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

      tail.visited.push([tail.x, tail.y]);
    }
  }
});

const part1Set = new Set();
tailsComp[0].visited.forEach((visited) => {
  part1Set.add(`${visited[0]},${visited[1]}`);
});

console.log(
  `PART 1: So, there are ${part1Set.size} positions the tail 1 visited at least once.`
); //Your puzzle answer was 6197.

const part2Set = new Set();

tailsComp[8].visited.forEach((visited) => {
  part2Set.add(`${visited[0]},${visited[1]}`);
});

console.log(
  `PART 2: So, there are ${part2Set.size} positions the tail 9 visited at least once.`
);
