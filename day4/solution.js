import { readFile } from "../utils.js";

const data = readFile("./data.txt");

const checkForContaining = (a, b) => {
  const [aS, aE] = a.split("-").map((x) => +x);
  const [bS, bE] = b.split("-").map((x) => +x);

  if (aS <= bS && aE >= bE) return 1;
  if (bS <= aS && bE >= aE) return 1;
  return 0;
};

const checkForOverlapping = (a, b) => {
  const [aS, aE] = a.split("-").map((x) => +x);
  const [bS, bE] = b.split("-").map((x) => +x);

  if (aE >= bS && aE <= bE) return 1;
  if (aS >= bS && aS <= bE) return 1;
  if (bE >= aS && bE <= aS) return 1;
  if (bS >= aS && bS <= aE) return 1;
  return 0;
};

let sum1 = 0;
let sum2 = 0;
data.forEach((a) => {
  const [f, s] = a.split(",");

  sum1 += checkForContaining(f, s);
  sum2 += checkForOverlapping(f, s);
});

console.log(sum1, sum2);
