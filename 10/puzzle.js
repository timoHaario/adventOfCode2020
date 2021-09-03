const { solve } = require("../utils");
const path = "./input.txt";

const partOne = (input) => {
  const arr = input.map((line) => Number(line)).sort((a, b) => a - b);
  const res = arr.reduce(
    (acc, jolt) => {
      const difference = Number(jolt) - Number(acc.last);
      const value = acc[difference] ? Number(acc[difference]) + 1 : 1;
      return {
        ...acc,
        [difference]: value,
        last: Number(jolt),
      };
    },
    { last: 0, 3: 1 }
  );
  console.log("res: ", res);
  console.log("1 multiplied with 3: ", res[1] * res[3]);
};

const partTwo = (input) => {
  const adapters = input.sort((a, b) => a - b);
  const combinations = adapters.reduce(
    (solved, current) => {
      const inRange = [0, ...adapters].filter(
        (num) => num >= current - 3 && num <= current - 1
      );
      return {
        ...solved,
        [current]: inRange.reduce((acc, curr) => {
          return acc + solved[curr];
        }, 0),
      };
    },
    { 0: 1 }
  );

  console.log("different combinations: ", combinations[adapters[adapters.length - 1]]);
};

solve(path, partTwo);
