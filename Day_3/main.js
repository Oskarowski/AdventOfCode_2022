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
console.log(rucksacksCompartments);

let appearsInBothCompartments = [];
rucksacksCompartments.forEach((rucksack) => {
  let indiCompartment = rucksack[0];
  console.log(indiCompartment);
  for (let i = 0; i < rucksack[0].length; i++) {
    let letter = rucksack[0][i];
    console.log(letter);
    if (rucksack[1].includes(letter)) {
      appearsInBothCompartments.push(letter);
      console.log("appearsInBothCompartments: " + letter);
      break;
    }
  }
});

console.log(appearsInBothCompartments);
