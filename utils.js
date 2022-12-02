import { readFileSync, promises as fsPromises } from "fs";

export const readFile = (filename) => {
  const content = readFileSync(filename, "utf-8");

  const arr = content.split(/\r?\n/);

  return arr;
};
