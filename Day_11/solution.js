"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const puzzleFile = fs_1.default
    .readFileSync(path_1.default.join(`${__dirname}/input.txt`))
    .toString()
    .replace(/\r/g, "");
const puzzleMonkeys = puzzleFile.split(/\n\s*\n/);
/**
 * Represents a Monkey object with @interface MonkeyData properties.
 */
class Monkey {
    constructor(monkeyEncoded) {
        var _a, _b, _c;
        const monkeyLines = monkeyEncoded.split(/\n/);
        this.id = Number((_a = monkeyLines[0].match(/(\d+)/)) === null || _a === void 0 ? void 0 : _a[0]);
        this.items = (_c = (_b = monkeyLines[1].match(/(\d+)/g)) === null || _b === void 0 ? void 0 : _b.map((e) => Number(e))) !== null && _c !== void 0 ? _c : [];
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
function printMonkeysItemsWithInspectionsCount(monkeys) {
    monkeys.forEach((monkey) => {
        console.log(`Monkey ${monkey.id} items: ${monkey.items} inspections: ${monkey.totalInspections}`);
    });
}
/**
 * Sorts an array of monkeys based on their total inspections in descending order.
 * @param {Monkey[]} monkeys - An array of Monkey objects.
 * @returns {Monkey[]} An array of Monkey objects sorted based on total inspections.
 */
function sortMostActiveMonkeys(monkeys) {
    const sortedMonkeys = monkeys.sort((a, b) => b.totalInspections - a.totalInspections);
    return sortedMonkeys;
}
/**
 * Calculates the product of total inspections for a subset of the most active monkeys.
 * @param {Monkey[]} monkeys - An array of Monkey objects.
 * @param {number} toConsider - The number of most active monkeys to consider.
 * @returns {number} The product of total inspections for the most active monkeys.
 */
function calculateMonkeyBusiness(monkeys, toConsider) {
    const mostActiveMonkeys = monkeys.slice(1, toConsider);
    const monkeyBusiness = mostActiveMonkeys.reduce((acc, monkey) => acc * monkey.totalInspections, monkeys[0].totalInspections);
    return monkeyBusiness;
}
/**
 * Calculates the worry level based on an item, a monkey's operation and a relief buffer.
 * @param {number} item - An item.
 * @param {Monkey} monkey - A Monkey object.
 * @param {number} reliefBuffer - A relief buffer.
 * @returns {number} The calculated and floored worry level.
 */
function calculateWorryLevel(item, monkey, reliefBuffer) {
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
function runTest(monkey, worryLevel) {
    switch (monkey.testOperation) {
        case "divisible":
            return worryLevel % monkey.testValue === 0;
    }
}
function round(reliefBuffer, monkeys) {
    monkeys.forEach((monkey) => {
        monkey.items.forEach((item) => {
            const worryLevel = calculateWorryLevel(item, monkey, reliefBuffer);
            monkey.totalInspections++;
            if (runTest(monkey, worryLevel)) {
                const throwTo = monkeys.find((m) => m.id === monkey.testPassed);
                throwTo === null || throwTo === void 0 ? void 0 : throwTo.items.push(worryLevel);
            }
            else {
                const throwTo = monkeys.find((m) => m.id === monkey.testFailed);
                throwTo === null || throwTo === void 0 ? void 0 : throwTo.items.push(worryLevel);
            }
        });
        monkey.items = [];
    });
}
function task1() {
    console.time("Task 1 Timing");
    var monkeys = puzzleMonkeys.map((monkey) => new Monkey(monkey));
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
//# sourceMappingURL=solution.js.map