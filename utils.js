const fs = require("fs");
const { performance } = require("perf_hooks");

const addInputToFunction = (path) => {
  const input = fs.readFileSync(path, "utf8").split("\n");

  return (func) => {
    const runTimeStart = performance.now();
    func(input);
    const runTimeEnd = performance.now();
    console.log(
      `Run time: ${Number.parseFloat(runTimeEnd - runTimeStart).toFixed(2)} ms`
    );
  };
};

module.exports.solve = (path, first = null, second = null) => {
  const withPerformance = addInputToFunction(path);
  first && withPerformance(first);
  second && withPerformance(second);
};
