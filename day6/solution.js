import { readFile } from "../utils.js";

const data = readFile("./data.txt")[0].split("");

const PACKET_START_MARKER_LENGTH = 4;
const MESSAGE_START_MARKER_LENGTH = 14;

const findMarkerStart = (_, i, arr) => {
  const noDuplicates = new Set(arr.slice(i, i + PACKET_START_MARKER_LENGTH));

  return noDuplicates.size === PACKET_START_MARKER_LENGTH;
};

const findMessageStart = (_, i, arr) => {
  const noDuplicates = new Set(arr.slice(i, i + MESSAGE_START_MARKER_LENGTH));
  return noDuplicates.size === MESSAGE_START_MARKER_LENGTH;
};

const startOfMarker = data.findIndex(findMarkerStart);
const answer1 = startOfMarker + PACKET_START_MARKER_LENGTH;
const startOfMessage = data.findIndex(findMessageStart);
const answer2 = startOfMessage + MESSAGE_START_MARKER_LENGTH;
console.log(answer1, answer2);
