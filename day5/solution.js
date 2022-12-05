import { readFile } from "../utils.js";

const data = readFile("./data.txt");
/**
 * 
        [H]     [W] [B]            
    [D] [B]     [L] [G] [N]        
[P] [J] [T]     [M] [R] [D]        
[V] [F] [V]     [F] [Z] [B]     [C]
[Z] [V] [S]     [G] [H] [C] [Q] [R]
[W] [W] [L] [J] [B] [V] [P] [B] [Z]
[D] [S] [M] [S] [Z] [W] [J] [T] [G]
[T] [L] [Z] [R] [C] [Q] [V] [P] [H]
 1   2   3   4   5   6   7   8   9 
 */

const cargo = [
  [],
  ["T", "D", "W", "Z", "V", "P"],
  ["L", "S", "W", "V", "F", "J", "D"],
  ["Z", "M", "L", "S", "V", "T", "B", "H"],
  ["R", "S", "J"],
  ["C", "Z", "B", "G", "F", "M", "L", "W"],
  ["Q", "W", "V", "H", "Z", "R", "G", "B"],
  ["V", "J", "P", "C", "B", "D", "N"],
  ["P", "T", "B", "Q"],
  ["H", "G", "Z", "R", "C"],
];

const cargo2 = JSON.parse(JSON.stringify(cargo));

const moveCrate9000 = (from, to, quantity) => {
  cargo[to].push(...cargo[from].splice(-quantity).reverse());
};

const moveCrate9001 = (from, to, quantity) => {
  cargo2[to].push(...cargo2[from].splice(-quantity));
};

data.forEach((instruction) => {
  const [_, quantity, __, from, ___, to] = instruction.split(" ");
  moveCrate9000(from, to, quantity);
  moveCrate9001(from, to, quantity);
});

const solution1 = cargo.map((row) => row[row.length - 1]).join("");
const solution2 = cargo2.map((row) => row[row.length - 1]).join("");

console.log(solution1, solution2);
