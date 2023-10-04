const fs = require("fs");

const puzzleInput = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .replace(/\r/g, "")
  .split("\n");

function task1(file: String) {
  let signalStrength: number = 0;
  let xRegister: number = 1;
  let cycleCount: number = 0;
  let cycleCheck: number = 20;

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

  console.log("Task 1 || The sum of signal strengths: " + signalStrength);
}

const signalStrengths = task1(
  fs.readFileSync(`${__dirname}/input`).toString().replace(/\r/g, "")
);
