import { letterToPixels } from "@/lib/letterMapping";
import { LetterGrid } from "./LetterGrid";
import { Pixel } from "@/types/game";
import { Dispatch, SetStateAction } from "react";

interface GameGridProps {
  attempts: string[];
  currentAttempt: string;
  maxAttempts: number;
  gameOver: boolean;
  targetWord: string;
  evaluatedWords?: Pixel[][][];
  currentPosition: number;
  setCurrentPosition: Dispatch<SetStateAction<number>>;
}

export const GameGrid = ({
  attempts,
  currentAttempt,
  maxAttempts,
  gameOver,
  targetWord,
  evaluatedWords,
  currentPosition,
  setCurrentPosition,
}: GameGridProps) => {
  console.log({ currentAttempt, currentPosition });
  return (
    <div className="grid gap-4 mb-8">
      {/* Previous attempts */}
      {attempts.map((attempt, attemptIndex) => (
        <div key={attemptIndex} className="flex gap-2 justify-center">
          {attempt.split("").map((letter, letterIndex) => {
            const evaluatedPixels =
              evaluatedWords?.[attemptIndex]?.[letterIndex] || [];
            return (
              <LetterGrid
                key={letterIndex}
                pixels={evaluatedPixels}
                isCorrectLetter={letter === targetWord[letterIndex]}
              />
            );
          })}
        </div>
      ))}

      {/* Current attempt */}
      {!gameOver && (
        <div className="flex gap-2 justify-center">
          {currentAttempt.split("").map((letter, index) => {
            if (letter == ".") {
              return (
                <LetterGrid
                  key={`empty-current-${index}`}
                  pixels={[]}
                  isEmpty={true}
                  isCurrentPosition={index + 1 == currentPosition}
                  setPosition={{
                    position: index + 1,
                    setCurrentPosition: setCurrentPosition,
                  }}
                />
              );
            } else {
              return (
                <LetterGrid
                  key={index}
                  pixels={letterToPixels(letter)}
                  isCurrentPosition={index + 1 == currentPosition}
                  setPosition={{
                    position: index + 1,
                    setCurrentPosition: setCurrentPosition,
                  }}
                />
              );
            }
          })}
        </div>
      )}

      {/* Empty slots */}
      {Array(maxAttempts - attempts.length - 1)
        .fill(null)
        .map((_, rowIndex) => (
          <div
            key={`empty-row-${rowIndex}`}
            className="flex gap-2 justify-center"
          >
            {Array(5)
              .fill(null)
              .map((_, colIndex) => (
                <LetterGrid
                  key={`empty-${rowIndex}-${colIndex}`}
                  pixels={[]}
                  isEmpty={true}
                />
              ))}
          </div>
        ))}
    </div>
  );
};
