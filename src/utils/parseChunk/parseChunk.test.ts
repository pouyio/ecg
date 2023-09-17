import { describe, expect, it } from "vitest";
import { parseChunk } from "./index";

const VALID_FILE = `131.648000000,-75.000000,,,,
131.652000000,-104.000000,,,,
131.656000000,-122.000000,,,,
131.660000000,-89.000000,,,,
131.664000000,-40.000000,,,,
131.668000000,-27.000000,,,,
131.672000000,-54.000000,,,,
131.676000000,-78.000000,,,,
131.680000000,-56.000000,941.000000,46.500000,-307.000000,
131.684000000,-12.000000,,,,
131.704000000,-2.000000,,,,`;

const INVALID_FILE = `this file has no correct formatted data`;

describe("parseChunk", () => {
  it("should parse a valid file correctly", () => {
    const parsedChunk = parseChunk(VALID_FILE);
    expect(parsedChunk).toEqual([
      {
        name: "Channel 1",
        data: [
          [131.652, -104],
          [131.656, -122],
          [131.66, -89],
          [131.664, -40],
          [131.668, -27],
          [131.672, -54],
          [131.676, -78],
          [131.68, -56],
          [131.684, -12],
        ],
      },
      {
        name: "Channel 2",
        data: [[131.68, 941]],
      },
      {
        name: "Channel 3",
        data: [[131.68, 46.5]],
      },
      {
        name: "Channel 4",
        data: [[131.68, -307]],
      },
    ]);
  });

  it("should return empty data and not crash", () => {
    const parsedChunk = parseChunk(INVALID_FILE);
    expect(parsedChunk).toEqual([
      { data: [], name: "Channel 1" },
      { data: [], name: "Channel 2" },
      { data: [], name: "Channel 3" },
      { data: [], name: "Channel 4" },
    ]);
  });
});
