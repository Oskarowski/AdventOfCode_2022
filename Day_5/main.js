const stacksOfCrates = [["Z", "N"], ["M", "C", "D"], ["P"]];

const craneInstructionsInput = `move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`;

const craneInstructionsSplit = craneInstructionsInput.split("\n");
const operationsInNumbers = [];

craneInstructionsSplit.forEach((instruction) => {
  instruction = instruction.split(" ");
  let numbersTemp = [];
  instruction.forEach((word) => {
    let maybeNumber = Number.parseInt(word);
    if (Number.isInteger(maybeNumber)) {
      numbersTemp.push(maybeNumber);
    }
  });
  operationsInNumbers.push(numbersTemp);
});

// console.log(operationsInNumbers);

operationsInNumbers.forEach((instructions) => {
  let homManyRepetitions = instructions[0];
  let fromWhichStack = instructions[1] - 1;
  let toWhichStack = instructions[2] - 1;

  for (let i = 0; i < homManyRepetitions; i++) {
    let content = stacksOfCrates[fromWhichStack].pop();
    stacksOfCrates[toWhichStack].push(content);
  }
});

// console.log(stacksOfCrates);

const topsOfStacks = [];
stacksOfCrates.forEach((stack) => {
  const top = stack[stack.length - 1];
  topsOfStacks.push(top);
});

console.log(topsOfStacks);
