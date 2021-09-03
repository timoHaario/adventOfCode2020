const { solve } = require("../utils");
const path = "./input.txt";

const yesAnswersAnyone = (input) => {
  const answers = input.reduce((acc, line) => {
    const onePerson = line.split("").reduce((acc, char) => {
      return {
        ...acc,
        [char]: true,
      };
    }, {});
    return {
      ...acc,
      ...onePerson,
    };
  }, {});
  return Object.keys(answers).length;
};

const yesAnswersEveryone = (input) => {
  const answers = input.reduce(
    (acc, line) => {
      const onePerson = line.split("").reduce((acc, char) => {
        return {
          ...acc,
          [char]: 1,
        };
      }, {});
      Object.keys(onePerson).forEach((key) =>
        acc[key] ? (acc[key] += onePerson[key]) : (acc[key] = onePerson[key])
      );
      return { ...acc, people: acc.people + 1 };
    },
    { people: 0 }
  );
  const everyoneAnsweredYes = Object.keys(answers).reduce((acc, key) => {
    return answers[key] === answers.people ? acc + 1 : acc;
  }, -1);
  return everyoneAnsweredYes;
};

const partOne = (input) => {
  const parsedData = input.reduce(
    (acc, line) => {
      if (line === "") {
        //currentRead contains lines of data for one group
        return {
          yesAnswers: [...acc.yesAnswers, yesAnswersAnyone(acc.currentRead)],
          currentRead: [],
        };
      } else {
        //read more lines into currentRead
        return {
          yesAnswers: acc.yesAnswers,
          currentRead: [...acc.currentRead, line],
        };
      }
    },
    {
      yesAnswers: [],
      currentRead: [],
    }
  );
  console.log(
    "Yes answers total: ",
    parsedData.yesAnswers.reduce((acc, curr) => acc + curr)
  );
};

const partTwo = (input) => {
  const parsedData = input.reduce(
    (acc, line) => {
      if (line === "") {
        //currentRead contains lines of data for one group
        return {
          yesAnswers: [...acc.yesAnswers, yesAnswersEveryone(acc.currentRead)],
          currentRead: [],
        };
      } else {
        //read more lines into currentRead
        return {
          yesAnswers: acc.yesAnswers,
          currentRead: [...acc.currentRead, line],
        };
      }
    },
    {
      yesAnswers: [],
      currentRead: [],
    }
  );
  console.log(
    "Yes answers total: ",
    parsedData.yesAnswers.reduce((acc, curr) => acc + curr)
  );
};
solve(path, partOne, partTwo);
