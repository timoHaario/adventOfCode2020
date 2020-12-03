const path = "./input.txt";
const { solve } = require("../utils");

const solvePartOneBruteForce = (input) => {
  loop: for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      const sum = Number(input[i]) + Number(input[j]);
      if (sum === 2020) {
        console.log("Answer to part one: ", input[i] * input[j]);
        break loop;
      }
    }
  }
};

const solvePartTwoBruteForce = (input) => {
  loop: for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {
      for (let k = 0; k < input.length; k++) {
        const sum = Number(input[i]) + Number(input[j]) + Number(input[k]);
        if (sum === 2020) {
          console.log("Answer to part two: ", input[i] * input[j] * input[k]);
          break loop;
        }
      }
    }
  }
};

solve(path, solvePartOneBruteForce, solvePartTwoBruteForce);
