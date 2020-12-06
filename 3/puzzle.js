const { solve } = require("../utils");
const path = "./input.txt";

const calculateEncounters = (input, right, down) => {
  const result = input.reduce(
    (acc, line) => {
      const width = line.length;
      const nextIndex = (acc.index + right) % width;
      const encounter = line[nextIndex] == "#" ? 1 : 0;

      const readLine = acc.skipCounter === 1;

      return readLine
        ? {
            encounters: acc.encounters + encounter,
            index: nextIndex,
            skipCounter: down,
          }
        : {
            ...acc,
            skipCounter: acc.skipCounter - 1,
          };
    },
    { encounters: 0, index: -right, skipCounter: 1 }
  );
  return result.encounters;
};

const partOne = (input) => {
  const encounters = calculateEncounters(input, 3, 1);
  console.log("Encounters: ", encounters);
};

const partTwo = (input) => {
  const encounters =
    calculateEncounters(input, 1, 1) *
    calculateEncounters(input, 3, 1) *
    calculateEncounters(input, 5, 1) *
    calculateEncounters(input, 7, 1) *
    calculateEncounters(input, 1, 2);

  console.log("Encounters: ", encounters);
};

solve(path, partOne, partTwo);
