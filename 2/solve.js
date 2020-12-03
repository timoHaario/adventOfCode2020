const { solve } = require("../utils");
const path = "./input.txt";

const parseLine = (line) => {
  //line format "1-3 a: abcde"
  const [amount, character, password] = line.split(" ");
  const [lower, upper] = amount.split("-");
  const parsedCharacter = character.replace(/:/g, "");

  return { lower, upper, parsedCharacter, password };
};

const partOne = (input) => {
  const amount = input.filter((line) => {
    const { lower, upper, parsedCharacter, password } = parseLine(line);
    const occurances = password.split(parsedCharacter).length - 1;
    return lower <= occurances && occurances <= upper;
  }).length;

  console.log(amount + " valid passwords in part one");
};

const partTwo = (input) => {
  const amount = input.filter((line) => {
    const { lower, upper, parsedCharacter, password } = parseLine(line);
    const lowerMatch = password[lower - 1] === parsedCharacter;
    const upperMatch = password[upper - 1] === parsedCharacter;
    return lowerMatch ^ upperMatch;
  }).length;
  console.log(amount + " valid passwords in part two");
};

solve(path, partOne, partTwo);
