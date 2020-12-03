const fs = require("fs");
const { performance } = require("perf_hooks");

const lineReader = (path) => {
  const array = fs.readFileSync(path, "utf8").split("\n");
  return array;
};

const perf = (path) => {
  const input = lineReader(path);

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
  const run = perf(path);
  first && run(first);
  second && run(second);
};
