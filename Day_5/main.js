const stacksOfCrates = [];

const craneInstructionsInput = ``;

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

let topsOfStacks = "";
stacksOfCrates.forEach((stack) => {
  const top = stack[stack.length - 1];
  // topsOfStacks.push(top);
  topsOfStacks += top;
});

console.log(topsOfStacks);
console.log(stacksOfCrates.length);
