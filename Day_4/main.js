const puzzleInput = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

// .replace(/[^\d]/g, "")

const puzzleInputSplitByLine = puzzleInput.split("\n");
// console.log(puzzleInputSplitByLine);

const splitOnPairOfAssignments = [];
puzzleInputSplitByLine.forEach((pair) => {
  let tempPair = [];
  tempPair = pair.split(",");
  let arrOfAssignments = [];
  tempPair.forEach((elf) => {
    arrOfAssignments.push(elf.split("-"));
  });
  let arrOfPairAssignments = [];
  arrOfPairAssignments = arrOfAssignments[0].concat(arrOfAssignments[1]);

  splitOnPairOfAssignments.push(arrOfPairAssignments);
});
// console.log(splitOnPairOfAssignments);

function checkIfInRange(min, max, rangeMin, rangeMax) {
  console.log(`\n${min} >= ${rangeMin} && ${min} <= ${rangeMax}`);
  if (min >= rangeMin && min <= rangeMax) {
    console.log(`${max} >= ${rangeMin} && ${max} <= ${rangeMax}`);
    if (max >= rangeMin && max <= rangeMax) {
      console.log("true");
      return true;
    } else return false;
  } else return false;
}

function fullyInRange(value, min, max) {
  //   console.log(`\n${value} >= ${min} && ${value} <= ${max}`);
  if (parseInt(value) >= parseInt(min) && parseInt(value) <= parseInt(max))
    return true;
  else return false;
}

const pairsFullyContainTheOther = [];
let rangeFullyContainTheOther = 0;
splitOnPairOfAssignments.forEach((elfPair) => {
  //   console.log(elfPair);
  let firstElfSectionStart = elfPair[0];
  let firstElfSectionEnd = elfPair[1];
  let secondElfSectionStart = elfPair[2];
  let secondElfSectionEnd = elfPair[3];

  if (
    fullyInRange(
      firstElfSectionStart,
      secondElfSectionStart,
      secondElfSectionEnd
    ) &&
    fullyInRange(firstElfSectionEnd, secondElfSectionStart, secondElfSectionEnd)
  ) {
    rangeFullyContainTheOther++;
    pairsFullyContainTheOther.push(elfPair);
  } else if (
    fullyInRange(
      secondElfSectionStart,
      firstElfSectionStart,
      firstElfSectionEnd
    ) &&
    fullyInRange(secondElfSectionEnd, firstElfSectionStart, firstElfSectionEnd)
  ) {
    rangeFullyContainTheOther++;
    pairsFullyContainTheOther.push(elfPair);
  }
});

console.log(
  `\nIn '${rangeFullyContainTheOther}' assignment pairs one range fully contain the other`
);
// console.log(pairsFullyContainTheOther);

// PART 2:

function inRange(value, min, max) {
  //   console.log(`\n${value} >= ${min} && ${value} <= ${max}`);
  if (parseInt(value) >= parseInt(min) && parseInt(value) <= parseInt(max))
    return true;
  else return false;
}

const pairsContainTheOther = [];
let rangeContainTheOther = 0;
splitOnPairOfAssignments.forEach((elfPair) => {
  //   console.log(elfPair);
  let firstElfSectionStart = elfPair[0];
  let firstElfSectionEnd = elfPair[1];
  let secondElfSectionStart = elfPair[2];
  let secondElfSectionEnd = elfPair[3];

  if (
    inRange(firstElfSectionStart, secondElfSectionStart, secondElfSectionEnd) ||
    inRange(firstElfSectionEnd, secondElfSectionStart, secondElfSectionEnd)
  ) {
    rangeContainTheOther++;
    pairsContainTheOther.push(elfPair);
  } else if (
    inRange(secondElfSectionStart, firstElfSectionStart, firstElfSectionEnd) ||
    inRange(secondElfSectionEnd, firstElfSectionStart, firstElfSectionEnd)
  ) {
    rangeContainTheOther++;
    pairsContainTheOther.push(elfPair);
  }
});
console.log(
  `\nIn '${rangeContainTheOther}' assignment pairs one range overlap the contain of the other`
);

console.log(pairsContainTheOther);
