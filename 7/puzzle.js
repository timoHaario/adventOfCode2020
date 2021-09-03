const { solve } = require("../utils");
const path = "./input.txt";

const parseBags = (input) => {
  return input.reduce((acc, line) => {
    const [left, right] = line.split("contain");
    const key = left.slice(0, -2);
    if (right.trim()[0] === "n") {
      return {
        ...acc,
        [key]: {},
      };
    } else {
      const values = right
        .trim()
        .slice(0, -1)
        .split(",")
        .map((value) => {
          return value[value.length - 1] === "s"
            ? value.trim().slice(0, -1)
            : value.trim();
        });
      return {
        ...acc,
        [key]: values.reduce((a, curr) => {
          const val = curr[0];
          const k = curr.substring(2);
          return {
            ...a,
            [k]: val,
          };
        }, {}),
      };
    }
  }, {});
};

//array of all bags that can hold toFind
const findBags = (bags, toFind, bagsSoFar) => {
  const nextBags = Object.keys(bags).filter((bag) => {
    return !!bags[bag][toFind];
  });
  if (nextBags.length === 0) {
    return bagsSoFar;
  } else {
    return nextBags.reduce(
      (soFar, bag) => {
        return [...soFar, ...findBags(bags, bag, [...bagsSoFar, bag])];
      },
      [...bagsSoFar]
    );
  }
};

const findWeights = (bags, toFind) => {
  const nextBags = Object.keys(bags[toFind]);
  if (nextBags.length === 0) {
    return 0;
  } else {
    const nextWave = nextBags.reduce((soFar, bagKey) => {
      const returnValue = Number(
          Number(soFar) + 
          Number(bags[toFind][bagKey]) +
          Number(bags[toFind][bagKey]) * Number(findWeights(bags, bagKey))
      );
      return returnValue;
    }, 0);
    return nextWave;
  }
};

const partOne = (input) => {
  const bags = parseBags(input);

  const bagsThatCanContainShiny = new Set(findBags(bags, "shiny gold bag", []));

  console.log(
    bagsThatCanContainShiny.size + " bag colors can contain one shiny gold bag"
  );
};

const partTwo = (input) => {
  const bags = parseBags(input);

  const bagsInsideShiny = findWeights(bags, "shiny gold bag");

  console.log(bagsInsideShiny + " bags inside shiny");
};
solve(path, partOne, partTwo);
