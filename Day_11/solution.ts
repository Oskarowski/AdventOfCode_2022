import fs from "fs";
import path from "path";

const puzzleFile: string = fs
  .readFileSync(path.join(`${__dirname}/input.txt`))
  .toString()
  .replace(/\r/g, "");

const puzzleMonkeys: string[] = puzzleFile.split(/\n\s*\n/);

interface MonkeyData {
  /**
   * Identifier for the monkey from input file.
   */
  id: number;
  /**
   * List of items the monkey has collected.
   */
  items: number[];
  operationSign: string;
  operationLeft: string;
  operationRight: string;
  testOperation: string;
  testValue: number;
  /**
   * Number of total inspected items.
   */
  totalInspections: number;
  /**
   * To which monkey item should be thrown if test was passed.
   */
  testPassed: number;
  /**
   * To which monkey item should be thrown if test was passed.
   */
  testFailed: number;
}

/**
 * Represents a Monkey object with @interface MonkeyData properties.
 */
class Monkey implements MonkeyData {
  public id;
  public items;
  public operationSign;
  public operationLeft;
  public operationRight;
  public testOperation;
  public testValue;
  public testPassed;
  public testFailed;
  public totalInspections;

  constructor(monkeyEncoded: string) {
    const monkeyLines: Array<string> = monkeyEncoded.split(/\n/);

    this.id = Number(monkeyLines[0].match(/(\d+)/)?.[0]);
    this.items = monkeyLines[1].match(/(\d+)/g)?.map((e) => Number(e)) ?? [];
    this.operationSign = monkeyLines[2].trim().slice(17).split(" ")[1];
    this.operationLeft = monkeyLines[2].trim().slice(17).split(" ")[0];
    this.operationRight = monkeyLines[2].trim().slice(17).split(" ")[2];
    this.testOperation = monkeyLines[3].trim().split(" ")[1];
    this.testValue = Number(monkeyLines[3].trim().split(" ")[3]);
    this.testPassed = Number(monkeyLines[4].trim().split(" ").pop());
    this.testFailed = Number(monkeyLines[5].trim().split(" ").pop());
    this.totalInspections = 0;
  }
}

function printMonkeysItemsWithInspectionsCount(monkeys: Monkey[]) {
  monkeys.forEach((monkey) => {
    console.log(
      `Monkey ${monkey.id} items: ${monkey.items} inspections: ${monkey.totalInspections}`
    );
  });
}

/**
 * Sorts an array of monkeys based on their total inspections in descending order.
 * @param {Monkey[]} monkeys - An array of Monkey objects.
 * @returns {Monkey[]} An array of Monkey objects sorted based on total inspections.
 */
function sortMostActiveMonkeys(monkeys: Monkey[]): Monkey[] {
  const sortedMonkeys = monkeys.sort(
    (a, b) => b.totalInspections - a.totalInspections
  );
  return sortedMonkeys;
}

/**
 * Calculates the product of total inspections for a subset of the most active monkeys.
 * @param {Monkey[]} monkeys - An array of Monkey objects.
 * @param {number} toConsider - The number of most active monkeys to consider.
 * @returns {number} The product of total inspections for the most active monkeys.
 */
function calculateMonkeyBusiness(
  monkeys: Monkey[],
  toConsider: number
): number {
  const mostActiveMonkeys = monkeys.slice(1, toConsider);
  const monkeyBusiness = mostActiveMonkeys.reduce(
    (acc, monkey) => acc * monkey.totalInspections,
    monkeys[0].totalInspections
  );
  return monkeyBusiness;
}

/**
 * Calculates the worry level based on an item, a monkey's operation and a relief buffer.
 * @param {number} item - An item.
 * @param {Monkey} monkey - A Monkey object.
 * @param {number} reliefBuffer - A relief buffer.
 * @returns {number} The calculated and floored worry level.
 */
function calculateWorryLevel(
  item: number,
  monkey: Monkey,
  reliefBuffer: number
): number {
  const leftSide = item;
  const rightSide = !isNaN(Number(monkey.operationRight))
    ? Number(monkey.operationRight)
    : item;
  var worryLevel = 0;

  switch (monkey.operationSign) {
    case "+":
      worryLevel = leftSide + rightSide;
      break;
    case "-":
      worryLevel = leftSide - rightSide;
      break;
    case "*":
      worryLevel = leftSide * rightSide;
      break;
    case "/":
      worryLevel = leftSide / rightSide;
      break;
  }

  return Math.floor(worryLevel / reliefBuffer);
}

function runTest(monkey: Monkey, worryLevel: number) {
  switch (monkey.testOperation) {
    case "divisible":
      return worryLevel % monkey.testValue === 0;
  }
}

function round(reliefBuffer: number, monkeys: Monkey[]) {
  monkeys.forEach((monkey) => {
    monkey.items.forEach((item) => {
      const worryLevel = calculateWorryLevel(item, monkey, reliefBuffer);
      monkey.totalInspections++;
      if (runTest(monkey, worryLevel)) {
        const throwTo = monkeys.find((m) => m.id === monkey.testPassed);
        throwTo?.items.push(worryLevel);
      } else {
        const throwTo = monkeys.find((m) => m.id === monkey.testFailed);
        throwTo?.items.push(worryLevel);
      }
    });
    monkey.items = [];
  });
}

function task1(): void {
  console.time("Task 1 Timing");
  var monkeys: Monkey[] = puzzleMonkeys.map((monkey) => new Monkey(monkey));

  var roundCounter = 0;
  const reliefBuffer = 3;

  while (roundCounter < 20) {
    round(reliefBuffer, monkeys);
    roundCounter++;
  }
  monkeys = sortMostActiveMonkeys(monkeys);
  const monkeyBusiness = calculateMonkeyBusiness(monkeys, 2);
  console.timeLog("Task 1 Timing");
  console.log(`Monkey business is ${monkeyBusiness}`);
}

task1();
