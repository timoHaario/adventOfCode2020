const { solve } = require("../utils");

const path = "./input.txt";

const partOne = (input) => {
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

const partTwo = (input) => {
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

solve(path, partOne, partTwo);
/*
  function parametes are optional, so you can as well run solve with only one function
  solve(path, partOne);
*/
