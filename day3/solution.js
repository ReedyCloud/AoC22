import { readFile } from "../utils.js";

const data = readFile("./data.txt");

const getPrioritiesSum = (arr) =>
  arr.reduce((p, c) => {
    const v = c.charCodeAt(0);
    if (v > 96) return p + (v - 96);
    return p + (v - 38);
  }, 0);

/**
 * PART 1
 */

const duplicates = [];

data.forEach((r) => {
  const h = r.length / 2;
  const p1 = Array.from(new Set(r.slice(0, h)));
  const p2 = Array.from(new Set(r.slice(h)));

  const arr = [...p1, ...p2];

  arr.forEach((v, i, a) => {
    if (a.lastIndexOf(v) != i) duplicates.push(v);
  });
});

const solution1 = getPrioritiesSum(duplicates);
console.log(solution1);

/**
 * PART 2
 */

const setsOfThree = [];
const badges = [];

for (let i = 0; i < data.length; i += 3) {
  setsOfThree.push([data[i], data[i + 1], data[i + 2]]);
}

setsOfThree.forEach((d) => {
  const p1 = Array.from(new Set(d[0]));
  const p2 = Array.from(new Set(d[1]));
  const p3 = Array.from(new Set(d[2]));

  const arr = [...p1, ...p2];

  arr.forEach((v, i, a) => {
    if (a.lastIndexOf(v) != i && p3.includes(v)) {
      badges.push(v);
    }
  });
});

const solution2 = getPrioritiesSum(badges);
console.log(solution2);
