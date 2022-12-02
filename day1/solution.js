import { readFile } from "../utils.js";

const arr = readFile("./data.txt");

const summedArr = [];

let j = 0;

arr.forEach((el) => {
  if (el) {
    if (!summedArr[j]) summedArr[j] = 0;
    summedArr[j] += +el;
  } else {
    j++;
  }
});

const sortedArr = [...summedArr].sort((a, b) => b - a);

const solution1 = sortedArr[0];
const solution2 = sortedArr.slice(0, 3).reduce((prev, curr) => prev + curr);
console.log(solution1, solution2);
