import { readFile } from "../utils.js";

const data = readFile("./data.txt");

const forest = data.map((row) => row.split("").map((x) => +x));

const forestHeight = forest.length;
const forestWidth = forest[0].length;

const checkLeft = (value, horizontalIndex, verticalIndex) => {
  let isVisible = true;
  for (let i = 0; i < horizontalIndex; i++) {
    if (forest[verticalIndex][i] >= value) {
      isVisible = false;
      break;
    }
  }
  return isVisible;
};
const checkTop = (value, horizontalIndex, verticalIndex) => {
  let isVisible = true;
  for (let i = 0; i < verticalIndex; i++) {
    if (forest[i][horizontalIndex] >= value) {
      isVisible = false;
      break;
    }
  }
  return isVisible;
};
const checkRight = (value, horizontalIndex, verticalIndex) => {
  let isVisible = true;
  for (let i = horizontalIndex + 1; i < forestWidth; i++) {
    if (forest[verticalIndex][i] >= value) {
      isVisible = false;
      break;
    }
  }
  return isVisible;
};
const checkBottom = (value, horizontalIndex, verticalIndex) => {
  let isVisible = true;
  for (let i = verticalIndex + 1; i < forestHeight; i++) {
    if (forest[i][horizontalIndex] >= value) {
      isVisible = false;
      break;
    }
  }
  return isVisible;
};

const isVisible = (value, horizontalIndex, verticalIndex) => {
  return (
    checkLeft(value, horizontalIndex, verticalIndex) ||
    checkTop(value, horizontalIndex, verticalIndex) ||
    checkRight(value, horizontalIndex, verticalIndex) ||
    checkBottom(value, horizontalIndex, verticalIndex)
  );
};

const countLeftScenicScore = (value, horizontalIndex, verticalIndex) => {
  let blockingTreeIndex = 0;
  if (horizontalIndex === 0) return 0;

  for (let i = horizontalIndex - 1; i >= 0; i--) {
    if (forest[verticalIndex][i] >= value) {
      blockingTreeIndex = i;
      break;
    }
  }
  // console.log('left',horizontalIndex - blockingTreeIndex)
  return horizontalIndex - blockingTreeIndex;
};
const countTopScenicScore = (value, horizontalIndex, verticalIndex) => {
  let blockingTreeIndex = 0;
  if (verticalIndex === 0) return 0;
  for (let i = verticalIndex - 1; i >= 0; i--) {
    if (forest[i][horizontalIndex] >= value) {
      blockingTreeIndex = i;
      break;
    }
  }
  // console.log('top', verticalIndex - blockingTreeIndex)
  return verticalIndex - blockingTreeIndex;
};
const countRightScenicScore = (value, horizontalIndex, verticalIndex) => {
  let blockingTreeIndex = forestWidth - 1;
  if (horizontalIndex === forestWidth - 1) return 0;

  for (let i = horizontalIndex + 1; i < forestWidth; i++) {
    if (forest[verticalIndex][i] >= value) {
      blockingTreeIndex = i;
      break;
    }
  }
  // console.log('right', blockingTreeIndex - horizontalIndex)
  return blockingTreeIndex - horizontalIndex;
};
const countBottomScenicScore = (value, horizontalIndex, verticalIndex) => {
  let blockingTreeIndex = forestHeight - 1;
  if (verticalIndex === forestHeight - 1) return 0;
  for (let i = verticalIndex + 1; i < forestHeight; i++) {
    if (forest[i][horizontalIndex] >= value) {
      blockingTreeIndex = i;
      break;
    }
  }
  // console.log('bottom', blockingTreeIndex,verticalIndex)
  return blockingTreeIndex - verticalIndex;
};

const countScenicScore = (value, horizontalIndex, verticalIndex) => {
  return (
    countBottomScenicScore(value, horizontalIndex, verticalIndex) *
    countRightScenicScore(value, horizontalIndex, verticalIndex) *
    countTopScenicScore(value, horizontalIndex, verticalIndex) *
    countLeftScenicScore(value, horizontalIndex, verticalIndex)
  );
};
let x = 0;
let maxScore = 0;
forest.forEach((row, vI) =>
  row.forEach((tree, hI) => {
    const xd = isVisible(tree, hI, vI);
    const score = countScenicScore(tree, hI, vI);
    if (score > maxScore) {
      maxScore = score;
    }
    if (xd) x += 1;
  }),
);

console.log(maxScore);
