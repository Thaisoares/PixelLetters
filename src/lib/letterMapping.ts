// src/lib/letterMapping.ts
import { Pixel } from "@/types/game";

export const LETTER_MAPPINGS: { [key: string]: number[][] } = {
  A: [
    [0, 0],
    [0, 4],
    [1, 1],
    [1, 3],
    [2, 2],
    [3, 1],
    [3, 3],
    [4, 0],
    [4, 4],
  ],
  B: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 0],
    [3, 4],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
  ],
  // Add more letters...
};

export const letterToPixels = (letter: string): Pixel[] => {
  const positions = LETTER_MAPPINGS[letter] || [];
  return positions.map(([row, col]) => ({
    row,
    col,
    color: "gray",
  }));
};
