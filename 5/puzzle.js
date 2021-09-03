const { solve } = require("../utils");
const path = "./input.txt";

const ids = (input) =>
  input.reduce(
    (acc, line) => {
      const rowPart = line.substring(0, 7);
      const columnPart = line.substring(7, 10);
      const row = rowPart.split("").reduce(
        (acc, character) => {
          const half = (acc.high - acc.low + 1) / 2;
          return character === "F"
            ? { low: acc.low, high: acc.high - half }
            : { low: acc.low + half, high: acc.high };
        },
        { low: 0, high: 127 }
      ).low;
      const column = columnPart.split("").reduce(
        (acc, character) => {
          const half = (acc.high - acc.low + 1) / 2;
          return character === "L"
            ? { low: acc.low, high: acc.high - half }
            : { low: acc.low + half, high: acc.high };
        },
        { low: 0, high: 7 }
      ).low;
      const id = row * 8 + column;
      return {
        idList: [...acc.idList, id],
        highest: Math.max(acc.highest, id),
      };
    },
    { highest: 0, idList: [] }
  );

const partOne = (input) => {
  const obj = ids(input);
  console.log("highest ID: ", obj.highest);
};

const partTwo = (input) => {
  const obj = ids(input);
  console.log(
    "Your seat number: ",
    obj.idList.find((id) => !obj.idList.includes(id + 1))
  );
};

solve(path, partOne, partTwo);
