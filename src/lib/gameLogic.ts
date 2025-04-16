import { Pixel } from "@/types/game";
import { letterToPixels } from "./letterMapping";

export const compareLetters = (
  attempt: string,
  target: string,
  currentAttempt: number
): Pixel[][] => {
  return attempt.split("").map((letter, index) => {
    const targetLetter = target[index];
    const attemptPixels = letterToPixels(letter);
    const targetPixels = letterToPixels(targetLetter);

    return attemptPixels.map((pixel) => {
      // If the letter is in the correct position, all its pixels should be blue
      if (letter === targetLetter) {
        return { ...pixel, color: "blue" };
      }

      // Only evaluate pixels up to the current row based on attempt number
      if (pixel.row > currentAttempt) {
        return { ...pixel, color: "gray" };
      }

      // Check if this pixel position exists in the target letter
      const hasPixelInTarget = targetPixels.some(
        (tp) => tp.row === pixel.row && tp.col === pixel.col
      );

      if (hasPixelInTarget) {
        return { ...pixel, color: "green" };
      } else {
        return { ...pixel, color: "red" };
      }
    });
  });
};
