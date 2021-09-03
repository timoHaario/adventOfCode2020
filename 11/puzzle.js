const { solve } = require("../utils");
const path = "./input.txt";

const isInside = (y, x, map) => {
  return y >= 0 && y <= map.length - 1 && x >= 0 && x <= map[0].length - 1;
};

const adjancentOccupied = (map, y, x) => {
  return [y - 1, y, y + 1].reduce((acc1, currentY) => {
    return (
      acc1 +
      [x - 1, x, x + 1].reduce((acc2, currentX) => {
        if (
          isInside(currentY, currentX, map) &&
          !(currentY === y && currentX === x)
        ) {
          return map[currentY][currentX] === "#" ? acc2 + 1 : acc2;
        } else {
          return acc2;
        }
      }, 0)
    );
  }, 0);
};
const partOne = (input) => {
  const cycleSeats = (map) => {
    return map.reduce((newMap, line, y) => {
      const newLine = [...line].reduce((acc, char, x) => {
        const occupied = adjancentOccupied(map, y, x);
        if (char === "L") {
          return occupied === 0 ? [...acc, "#"] : [...acc, "L"];
        } else if (char === "#") {
          return occupied >= 4 ? [...acc, "L"] : [...acc, "#"];
        } else {
          return [...acc, "."];
        }
      }, []);
      return [...newMap, newLine];
    }, []);
  };

  const rec = (func, input) => {
    const res = func(input);
    if (JSON.stringify(res) === JSON.stringify(input)) {
      return res;
    } else {
      return rec(func, res);
    }
  };

  const res = rec(cycleSeats, input);
  console.log(
    (JSON.stringify(res).match(new RegExp("#", "g")) || []).length +
      " occupied seats"
  );
};

solve(path, partOne);
