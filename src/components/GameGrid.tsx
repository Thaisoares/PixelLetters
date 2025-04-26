// src/components/GameGrid.tsx
"use client";

import { useGame } from "@/context/GameContext";
import { LetterGrid } from "./LetterGrid";
import { letterToPixels } from "@/lib/letterMapping";

export const GameGrid = () => {
  const {
    gameState: {
      attempts,
      currentAttempt,
      maxAttempts,
      gameOver,
      targetWord,
      evaluatedWords,
    },
    currentPosition,
    setCurrentPosition,
  } = useGame();
  console.log({ attempts, currentAttempt, currentPosition });
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
          {currentAttempt.split("").map((letter, index) => (
            <LetterGrid
              key={index}
              pixels={letter !== "." ? letterToPixels(letter) : []}
              isEmpty={letter === "."}
              isCurrentPosition={currentPosition - 1 === index}
              position={index + 1}
            />
          ))}
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
            {Array(currentAttempt.length)
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
