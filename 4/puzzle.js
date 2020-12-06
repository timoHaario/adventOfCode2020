const { solve } = require("../utils");
const path = "./input.txt";

const PASSPORT_TEMPLATE = () => ({
  byr: false,
  iyr: false,
  eyr: false,
  hgt: false,
  hcl: false,
  ecl: false,
  pid: false,
  cid: false,
});

const REQUIRED_FIELDS = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

const parsePassports = (input) => {
  const parsedData = input.reduce(
    (acc, line) => {
      if (line === "") {
        //currentRead contains lines of data for one passport
        return {
          passports: [...acc.passports, parsePassport(acc.currentRead)],
          currentRead: [],
        };
      } else {
        //read more lines into currentRead
        return {
          passports: acc.passports,
          currentRead: [...acc.currentRead, line],
        };
      }
    },
    {
      passports: [],
      currentRead: [],
    }
  );
  return parsedData.passports;
};

const parsePassport = (passportLines) => {
  return passportLines.reduce((accu, line) => {
    const obj = accu;
    line.split(" ").forEach((value) => {
      const split = value.split(":");
      obj[split[0]] = split[1];
    });
    return obj;
  }, PASSPORT_TEMPLATE());
};

const checkRequiredFields = (passport, required) => {
  return required.reduce((valid, field) => {
    return valid && !!passport[field];
  }, true);
};

const partOne = (input) => {
  const passports = parsePassports(input);
  const validPassportCount = passports.reduce((count, passport) => {
    const isValid = checkRequiredFields(passport, REQUIRED_FIELDS);
    return isValid ? count + 1 : count;
  }, 0);
  console.log(validPassportCount + " valid passports");
};

solve(path, partOne);
