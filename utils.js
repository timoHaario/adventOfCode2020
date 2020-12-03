const fs = require("fs");
const { performance } = require("perf_hooks");

const lineReader = async (path) => {
  const array = await fs.readFileSync(path, "utf8").split("\n");
  return array;
};

const perf = async (path) => {
  const input = await lineReader(path);

  return (func) => {
    const runTimeStart = performance.now();
    func(input);
    const runTimeEnd = performance.now();
    console.log(
      `Run time: ${Number.parseFloat(runTimeEnd - runTimeStart).toFixed(2)} ms`
    );
  };
};

module.exports.solve = async (path, first = null, second = null) => {
  const run = await perf(path);
  first && run(first);
  second && run(second);
};
