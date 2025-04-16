import { Pixel } from "@/types/game";
import { LETTER_MAPPINGS } from "./letters";

export const letterToPixels = (letter: string): Pixel[] => {
  const letterPattern =
    LETTER_MAPPINGS[letter] || Array(7).fill(Array(5).fill(0));
  const pixels: Pixel[] = [];

  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 5; col++) {
      if (letterPattern[row][col] === 1) {
        pixels.push({
          row,
          col,
          color: "gray",
        });
      }
    }
  }

  return pixels;
};
