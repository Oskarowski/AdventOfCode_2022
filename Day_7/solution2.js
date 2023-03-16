var start = new Date().getTime();
const fs = require("fs");

const puzzleLines = fs
  .readFileSync(`${__dirname}/input`)
  .toString()
  .replace(/\r/g, "")
  .split("\n");

function createTree(puzzleLines) {
  const tree = {
    name: "/",
    isDirectory: true,
    children: [],
    parent: null,
  }; // node: name, isDirectory, size, children, parent

  let currentNode = tree;
  let currentCommand = null;

  for (const line of puzzleLines) {
    if (line[0] === "$") {
      const match = /^\$ (?<command>\w+)(?: (?<arg>.+))?$/.exec(line);

      currentCommand = match.groups.command;

      if (currentCommand === "cd") {
        const targetDirectory = match.groups.arg;
        switch (targetDirectory) {
          case "/":
            currentNode = tree;
            break;
          case "..":
            currentNode = currentNode.parent;
            break;
          default:
            currentNode = currentNode.children.find(
              (folder) => folder.isDirectory && folder.name === targetDirectory
            );
        }
      }
    } else {
      if (currentCommand === "ls") {
        const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(line);
        if (fileMatch) {
          const node = {
            name: fileMatch.groups.name,
            size: parseInt(fileMatch.groups.size),
            isDirectory: false,
            parent: currentNode,
          };
          currentNode.children.push(node);
        }

        const dirMatch = /^dir (?<name>.+)$/.exec(line);
        if (dirMatch) {
          const node = {
            name: dirMatch.groups.name,
            isDirectory: true,
            children: [],
            parent: currentNode,
          };
          currentNode.children.push(node);
        }
      } else {
        throw new Error("Unkown state");
      }
    }
  }

  return tree;
}

function printTree(node, depth = 0) {
  console.log(
    `${" ".repeat(depth * 2)}- ${node.name} (${
      node.isDirectory ? "dir" : `file, size=${node.size}`
    })`
  );
  if (node.isDirectory) {
    for (const child of node.children) {
      printTree(child, depth + 1);
    }
  }
}

function getSize(node, directoryCallback = () => {}) {
  if (!node.isDirectory) {
    return node.size;
  }
  const directorySize = node.children
    .map((child) => getSize(child, directoryCallback))
    .reduce((a, b) => a + b, 0);

  directoryCallback(node.name, directorySize);

  return directorySize;
}

function part1() {
  const thresholdSize = 100000;
  const tree = createTree(puzzleLines);

  //   printTree(tree);

  var sumSmallFolder = 0;

  getSize(tree, (name, size) => {
    if (size < thresholdSize) {
      sumSmallFolder += size;
    }
  });

  console.log(
    `\nThe sum of the total sizes of those directories is ${sumSmallFolder}`
  );
}

part1();

function part2() {
  const totalDiskSpace = 70000000;
  const requiredSpace = 30000000;

  const tree = createTree(puzzleLines);

  const usedSpace = getSize(tree);
  const availableSpace = totalDiskSpace - usedSpace;
  if (availableSpace > requiredSpace) {
    throw new Error("There is already enough space");
  }
  const minimumFolderSize = requiredSpace - availableSpace;

  const candidates = [];

  getSize(tree, (name, size) => {
    if (size >= minimumFolderSize) {
      candidates.push({
        name,
        size,
      });
    }
  });

  candidates.sort((a, b) => a.size - b.size);

  console.log(`\nThe total size of that directory is: ${candidates[0].size}`);
}

part2();

var end = new Date().getTime();
console.log("T:", end - start);
