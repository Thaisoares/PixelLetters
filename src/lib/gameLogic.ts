// src/lib/gameLogic.ts
import { Pixel } from "@/types/game";
import { letterToPixels, LETTER_MAPPINGS } from "./letterMapping";

export const compareLetters = (attempt: string, target: string): Pixel[][] => {
  return attempt.split("").map((letter, index) => {
    const targetLetter = target[index];
    const pixels = letterToPixels(letter);

    if (letter === targetLetter) {
      return pixels.map((p) => ({ ...p, color: "blue" }));
    }

    const targetPixels = LETTER_MAPPINGS[targetLetter] || [];
    const attemptPixels = LETTER_MAPPINGS[letter] || [];

    return pixels.map((pixel) => {
      const pos = [pixel.row, pixel.col];
      const isInTarget = targetPixels.some(
        ([r, c]) => r === pos[0] && c === pos[1]
      );
      const isInAttempt = attemptPixels.some(
        ([r, c]) => r === pos[0] && c === pos[1]
      );

      if (isInTarget && isInAttempt) {
        return { ...pixel, color: "green" };
      } else if (!isInTarget && isInAttempt) {
        return { ...pixel, color: "red" };
      }
      return { ...pixel, color: "gray" };
    });
  });
};
