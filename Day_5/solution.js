const fs = require("fs");

const splitInput = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split("\r\n\r\n");
const stacksInput = splitInput[0].split("\n");
const instructions = splitInput[1].split("\n");

const stacksNumbers = stacksInput[stacksInput.length - 1]
  .match(/\d+/g)
  .map((num) => +num);

const amountOfStacks = Math.max(...stacksNumbers);

let stacks = [];
for (let i = 0; i < amountOfStacks; i++) {
  stacks.push([]);
}

for (let loop = stacksInput.length - 2; loop >= 0; loop--) {
  let stackNum = 0;
  let strLoop = 0;

  while (strLoop < stacksInput[loop].length) {
    const crate = stacksInput[loop].substring(strLoop, strLoop + 3).trim();
    if (crate !== "") {
      stacks[stackNum].push(crate.charAt(1));
    }
    stackNum++;
    strLoop += 4;
  }
}
// const stacksCopy = JSON.parse(JSON.stringify(stacks));

for (let move of instructions) {
  const splitOnSpace = move.split(" ");
  const repetitions = +splitOnSpace[1];
  const orgin = +splitOnSpace[3] - 1;
  const destination = +splitOnSpace[5] - 1;

  for (let i = 0; i < repetitions; i++) {
    const crateToMove = stacks[orgin].pop();
    stacks[destination].push(crateToMove);
  }
}

let topStacksView = "";
for (let stack of stacks) {
  topStacksView += stack[stack.length - 1];
}

console.log(`PART 1: CrateMover 9000: ${topStacksView}`);
