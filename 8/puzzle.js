const { solve } = require("../utils");
const path = "./input.txt";

const executeCommand = (command, value, acc, index) => {
  switch (command) {
    case "acc":
      return [acc + Number(value), index + 1];
    case "jmp":
      return [acc, index + Number(value)];
    case "nop":
      return [acc, index + 1];
    default:
      break;
  }
};

const runCommands = (acc, instructions, index, used) => {
  if (used[index]) {
    return acc;
  } else {
    const [command, value] = instructions[index].split(" ");
    const [newAcc, newIndex] = executeCommand(command, value, acc, index);
    const newUsed = {
      ...used,
      [index]: true,
    };
    return runCommands(newAcc, instructions, newIndex, newUsed);
  }
};

const runCommands2 = (
  acc,
  instructions,
  index,
  used,
  switchedValues,
  switched
) => {
  const endOfArr = index >= instructions.length - 1;
  const isUsedAlready = used[index];
  if (endOfArr) {
    //last instruction terminated
    return acc;
  } else if (isUsedAlready) {
    //hit a loop, restart but keep track of already switched instructions
    runCommands2(0, instructions, 0, {}, switchedValues, false);
  } else {
    const [command, value] = instructions[index].split(" ");
    const newUsed = {
      ...used,
      [index]: true,
    };
    const needsSwitching =
      (command === "jmp" || command === "nop") &&
      !switched &&
      !switchedValues[index];
    if (needsSwitching) {
      const newCommand = command === "jmp" ? "nop" : "jmp";
      const newSwitchedValues = {
        ...switchedValues,
        [index]: true,
      };
      const [newAcc, newIndex] = executeCommand(newCommand, value, acc, index);
      console.log("new command: ", newCommand);
      console.log("acc and newAcc: ", `${acc} , ${newAcc}`);
      console.log("index and new index: ", `${index} , ${newIndex}`);

      return runCommands2(
        newAcc,
        instructions,
        newIndex,
        newUsed,
        newSwitchedValues,
        true
      );
    } else {
      const [newAcc, newIndex] = executeCommand(command, value, acc, index);
      return runCommands2(
        newAcc,
        instructions,
        newIndex,
        newUsed,
        switchedValues,
        switched
      );
    }
  }
};

const partOne = (input) => {
  console.log("Value: ", runCommands(0, input, 0, {}));
};

const partTwo = (input) => {
  console.log("Value: ", runCommands2(0, input, 0, {}, {}));
};

solve(path, partTwo);
