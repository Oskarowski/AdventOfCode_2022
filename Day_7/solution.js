const fs = require("fs");
const puzzleInputSplit = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .split("$");
puzzleInputSplit.shift();
puzzleInputSplit.shift();

tree = { "/": null };

var direcotoryPath = ["/"];

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

  for (var i = 0; i < commendLineSplit.length - 1; i += 2) {
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
      // console.log("commend: ls");
      var currentDirectory = direcotoryPath.slice(-1);
      // console.log("currentDirectory:", currentDirectory);
      // console.log("commendLineArray:", commendLineArray);
      if (
        tree[currentDirectory] === undefined ||
        tree[currentDirectory] === null
      ) {
        tree[currentDirectory] = [];
      }
      commendLineArray.forEach((data) => {
        // console.log("data:", data);
        if (data[0] === "dir") {
          const object = new Directory(data[1]);
          tree[currentDirectory].push(object);
        } else {
          const object = new File(data[1], data[0]);
          tree[currentDirectory].push(object);
        }
      });

      // console.log("tree[direcotoryPath", tree[currentDirectory]);
      break;
    }
    case "cd": {
      // console.log("\ncommend: cd");
      if (commendLineArray[0] == "..") {
        direcotoryPath.pop();
      } else if (commendLineArray[0] == "/") {
        direcotoryPath.splice(1);
      } else {
        direcotoryPath.push(...commendLineArray);
      }
      var currentDirectory = direcotoryPath.slice(-1);
      // console.log("currentDirectory:", currentDirectory);
      // console.log("tree[direcotoryPath.slice(-1)]", tree[currentDirectory]);
      break;
    }
  }
});

// console.log("\n\n", tree, "\n\n");

function setSizeOfDirectory(directory) {
  var totalSizeOfDirectory = 0;
  // console.log("directory:", directory);
  const currentDirectory = directory.dirName;
  // console.log("currentDirectory:", currentDirectory);
  // console.log("tree[currentDirectory]:", tree[currentDirectory]);

  tree[currentDirectory].forEach((data) => {
    if (data.dirName) {
      totalSizeOfDirectory += parseInt(setSizeOfDirectory(data));
    } else if (data.fileSize) {
      totalSizeOfDirectory += parseInt(data.fileSize);
    }
  });
  return totalSizeOfDirectory;
}

for (var directory in tree) {
  // console.log("We are in dir: ", directory);

  var currentDirectorySize = 0;
  // console.log("tree[directory]", tree[directory]);

  tree[directory].forEach((data) => {
    if (data.dirName) {
      currentDirectorySize += parseInt(setSizeOfDirectory(data));
    } else {
      currentDirectorySize += parseInt(data.fileSize);
    }
  });
  tree[directory].directorySize = currentDirectorySize;
}

console.log("\n\n", tree, "\n\n");

const maxTotalSize = 100000;
const lessThenMaxArray = [];

function ifSizeLessThenMax({ dirName }, size) {
  // console.log("size", size, "dirName", dirName);
  if (size < maxTotalSize) {
    lessThenMaxArray.push(dirName);
  }
}

function getSizeOfDirectory({ dirName }) {
  tree[dirName].forEach((data) => {
    if (data.dirName) {
      ifSizeLessThenMax(data, tree[data.dirName].directorySize);
      getSizeOfDirectory(data);
    }
  });
}

for (var directory in tree) {
  tree[directory].forEach((data) => {
    if (data.dirName) {
      ifSizeLessThenMax(data, tree[data.dirName].directorySize);
      getSizeOfDirectory(data);
    }
  });
}
// console.log("lessThenMaxArray: ", lessThenMaxArray);
const finalDirArray = [...new Set(lessThenMaxArray)];

const sumOfFinalDirArraySize = finalDirArray.reduce(
  (accumulator, currentDir) => accumulator + tree[currentDir].directorySize,
  0
);

console.log(
  `The sum of the total sizes of those directories is: ${sumOfFinalDirArraySize}`
);
