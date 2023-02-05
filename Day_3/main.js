const puzzleInput = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;
const individualRucksacks = puzzleInput.split("\n");

let rucksacksCompartments = [];
individualRucksacks.forEach((rucksack) => {
  const rucksackLength = rucksack.length;
  let rucksackCompartments = [];
  rucksackCompartments.push(rucksack.slice(0, rucksackLength / 2));
  rucksackCompartments.push(rucksack.slice(rucksackLength / 2));
  rucksacksCompartments.push(rucksackCompartments);
});
// console.log(rucksacksCompartments);

let appearsInBothCompartments = [];
rucksacksCompartments.forEach((rucksack) => {
  let indiCompartment = rucksack[0];
  // console.log(indiCompartment);
  for (let i = 0; i < rucksack[0].length; i++) {
    let letter = rucksack[0][i];
    // console.log(letter);
    if (rucksack[1].includes(letter)) {
      appearsInBothCompartments.push(letter);
      // console.log("appearsInBothCompartments: " + letter);
      break;
    }
  }
});

// console.log(appearsInBothCompartments);

const alphaLower = Array.from(Array(26)).map((e, i) => i + 97);
const alphaUpper = Array.from(Array(26)).map((e, i) => i + 65);

const alphabetLower = alphaLower.map((e) => String.fromCharCode(e));
const alphabetUpper = alphaUpper.map((e) => String.fromCharCode(e));

const fullAlphaber = [].concat(alphabetLower, alphabetUpper);

let priority = 1;
let lettersWithPriority = [];
fullAlphaber.forEach((letter) => {
  lettersWithPriority[letter] = priority;
  priority++;
});
// console.log(lettersWithPriority);

let sumOfPriorities = 0;
appearsInBothCompartments.forEach((letter) => {
  let value = lettersWithPriority[letter];
  sumOfPriorities += value;
});
console.log(
  `'PART 1:' Sum of the priorities of those item types is: ${sumOfPriorities} \n`
);

// PART 2:
const rucksacksOfElvesByGroups = [];

for (let l = 0; l < individualRucksacks.length; l += 3) {
  let temporaryGroup = [];
  for (let i = 0; i < 3; i++) {
    temporaryGroup.push(individualRucksacks[l + i]);
  }
  rucksacksOfElvesByGroups.push(temporaryGroup);
}
// console.log(rucksacksOfElvesByGroups);
const itemThatAppearsInAllThreeRucksacks = [];

function alsoInOthersRucksacks(letter, rucksack) {
  return rucksack.includes(letter);
}

rucksacksOfElvesByGroups.forEach((group) => {
  let firstRucksack = group[0];
  for (
    let indexOfLetter = 0;
    indexOfLetter < firstRucksack.length;
    indexOfLetter++
  ) {
    letter = firstRucksack[indexOfLetter];
    if (
      alsoInOthersRucksacks(letter, group[1]) &&
      alsoInOthersRucksacks(letter, group[2])
    ) {
      itemThatAppearsInAllThreeRucksacks.push(letter);
      break;
    }
  }
});
// console.log(itemThatAppearsInAllThreeRucksacks);

let prioritiesOfBadges = 0;
itemThatAppearsInAllThreeRucksacks.forEach((letter) => {
  let value = lettersWithPriority[letter];
  prioritiesOfBadges += value;
});
console.log(
  `'PART 2:' Sum of the priorities of those badges types is: ${prioritiesOfBadges} \n`
);
