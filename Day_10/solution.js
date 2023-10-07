"use strict";
const fs = require("fs");
const puzzleInput = fs
    .readFileSync(`${__dirname}/input`)
    .toString()
    .replace(/\r/g, "")
    .split("\n");
function task1(file) {
    console.time("Task 1");
    let signalStrength = 0;
    let xRegister = 1;
    let cycleCount = 0;
    let cycleCheck = 20;
    const commands = file.split("\n");
    for (let i = 0; i < commands.length; i++) {
        cycleCount++;
        const command = commands[i].trim();
        if (command.startsWith("addx")) {
            cycleCount++;
            if (cycleCount >= cycleCheck) {
                signalStrength += xRegister * cycleCheck;
                cycleCheck += 40;
            }
            xRegister += parseInt(command.split(" ")[1]);
        }
    }
    console.timeLog("Task 1");
    console.log("The sum of signal strengths: " + signalStrength + "\n");
}
const signalStrengths = task1(fs.readFileSync(`${__dirname}/input`).toString().replace(/\r/g, ""));
function task2(file) {
    console.time("Task 2");
    const commands = file.split("\n");
    let litPixels = [];
    let xRegister = 1;
    let cycle = 0;
    const tickCycle = () => {
        cycle++;
        if (xRegister <= cycle && cycle <= xRegister + 2) {
            litPixels.push(cycle - 1);
        }
        if (cycle === 40) {
            for (let xId = 0; xId < 40; xId++) {
                litPixels.includes(xId)
                    ? process.stdout.write("#")
                    : process.stdout.write(".");
            }
            console.log("");
            litPixels = [];
            cycle = 0;
        }
    };
    for (const commend of commands) {
        tickCycle();
        if (commend.startsWith("addx")) {
            tickCycle();
            xRegister += parseInt(commend.split(" ")[1]);
        }
    }
    console.timeLog("Task 2");
}
task2(fs.readFileSync(`${__dirname}/input`).toString().replace(/\r/g, ""));
//# sourceMappingURL=solution.js.map