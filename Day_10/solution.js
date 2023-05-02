const fs = require("fs");

const puzzleInput = fs
  .readFileSync(`${__dirname}/test`)
  .toString()
  .replace(/\r/g, "")
  .split("\n");

const amountOfCycles = 220;
var x = 1;
var queue = [];
// { wait: 1, howMuchToAdd: Number }

var cycle = 1;
var whichLine = 0;
const valueInAskedCycles = [];

while (cycle <= 220) {
  const line = puzzleInput[whichLine] || "";

  if (line === "noop") {
    whichLine++;
    cycle++;
  }

  if (line !== "noop") {
    if (queue.length !== 0) {
      cycle++;
      if (queue[0].wait === 0) {
        x += Number(queue[0].howMuchToAdd);
        queue.shift();
      } else {
        queue[0].wait--;
      }
    } else if (line !== "") {
      const taskSplit = line.split(" ");
      queue.push({
        wait: 1,
        howMuchToAdd: Number(taskSplit[1]),
      });
      whichLine++;
      continue;
    }
  }

  const moduloOperation = cycle % 40;
  switch (moduloOperation) {
    case 20:
      valueInAskedCycles.push({ cycle: cycle, X: x, value: x * cycle });
      break;
  }
}
console.log(valueInAskedCycles);

// 20th cycle, X has the value 21, 20 * 21 = 420
// 60th cycle, X has the value 19, 60 * 19 = 1140
//100th cycle, X has the value 18, 100 * 18 = 1800
//140th cycle, X has the value 21, 140 * 21 = 2940
//180th cycle, X has the value 16, 180 * 16 = 2880
//220th cycle, X has the value 18, 220 * 18 = 3960
