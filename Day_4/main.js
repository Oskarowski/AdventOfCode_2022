const puzzleInput = `1-2,3-5
1-1,1-5
5-10,10-20
3-3,3-3
2-6,4-6
2-16,4-8`;

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

function inRange(value, min, max) {
  if (value >= min && value <= max) return true;
  else return false;
}

const pairsContainTheOther = [];
let rangeFullyContainTheOther = 0;
splitOnPairOfAssignments.forEach((elfPair) => {
  console.log(elfPair);
  let firstElfSectionStart = elfPair[0];
  //   console.log(firstElfSectionStart);
  let firstElfSectionEnd = elfPair[1];
  //   console.log(firstElfSectionEnd);
  let secondElfSectionStart = elfPair[2];
  //   console.log(secondElfSectionStart);
  let secondElfSectionEnd = elfPair[3];
  //   console.log(secondElfSectionEnd);

  if (
    checkIfInRange(
      firstElfSectionStart,
      firstElfSectionEnd,
      secondElfSectionStart,
      secondElfSectionEnd
    )
  ) {
    rangeFullyContainTheOther++;
    pairsContainTheOther.push(elfPair);
  } else if (
    checkIfInRange(
      secondElfSectionStart,
      secondElfSectionEnd,
      firstElfSectionStart,
      firstElfSectionEnd
    )
  ) {
    rangeFullyContainTheOther++;
    pairsContainTheOther.push(elfPair);
  }
});

console.log(
  `\nIn '${rangeFullyContainTheOther}' assignment pairs one range fully contain the other`
);
console.log(pairsContainTheOther);
