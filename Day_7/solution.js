const fs = require("fs");
const puzzleInputSplit = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split("$");
puzzleInputSplit.shift();
puzzleInputSplit.shift();

tree = { "/": null };

var direcotoryPath = ["/"];

console.log("\n");

class Directory {
  constructor(dirName) {
    this.dirName = dirName;
  }
}

class File {
  constructor(fileName, fileSize) {
    this.fileName = fileName;
    this.fileSize = fileSize;
  }
}

puzzleInputSplit.forEach((commendLine, whichLine) => {
  commendLine = commendLine.trimStart();
  commendLine = commendLine.replace(/\s{1,}/g, " ");
  var commend = commendLine.slice(0, 2);
  commendLine = commendLine.slice(3);

  var commendLineSplit = commendLine.split(" ");
  const commendLineArray = [];

  for (var i = 0; i < (commendLineSplit.length - 1) / 2; i += 2) {
    var temporaryArray = [];
    if (commendLineSplit[i] !== "") {
      temporaryArray.push(commendLineSplit[i]);
    }
    if (commendLineSplit[i + 1] !== "") {
      temporaryArray.push(commendLineSplit[i + 1]);
    }
    commendLineArray.push(temporaryArray);
  }
  // console.log("commend:", commend);
  // console.log("commendLineArray:", commendLineArray);

  switch (commend) {
    case "ls": {
      console.log("commend: ls");
      var currentDirectory = direcotoryPath.slice(-1);
      console.log("currentDirectory:", currentDirectory);
      console.log("commendLineArray:", commendLineArray);
      if (
        tree[currentDirectory] === undefined ||
        tree[currentDirectory] === null
      ) {
        tree[currentDirectory] = [];
      }
      commendLineArray.forEach((data) => {
        console.log("data:", data);
        if (data[0] === "dir") {
          const object = new Directory(data[1]);
          tree[currentDirectory].push(object);
        } else {
          const object = new File(data[1], data[0]);
          tree[currentDirectory].push(object);
        }
      });

      console.log("tree[direcotoryPath", tree[currentDirectory]);
      break;
    }
    case "cd": {
      console.log("\ncommend: cd");
      if (commendLineArray[0] == "..") {
        direcotoryPath.pop();
      } else if (commendLineArray[0] == "/") {
        direcotoryPath.splice(1);
      } else {
        direcotoryPath.push(...commendLineArray);
      }
      var currentDirectory = direcotoryPath.slice(-1);
      console.log("currentDirectory:", currentDirectory);
      console.log("tree[direcotoryPath.slice(-1)]", tree[currentDirectory]);
      break;
    }
  }
});

console.log("\n\n", tree);
