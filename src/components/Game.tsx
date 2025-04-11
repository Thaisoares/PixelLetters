// src/components/Game.tsx
"use client";

import { useState, useEffect } from "react";
import { LetterGrid } from "./LetterGrid";
import { GameState } from "@/types/game";
import { getRandomWord, isValidWord } from "@/lib/wordList";
import { compareLetters } from "@/lib/gameLogic";

export const Game = () => {
  const [gameState, setGameState] = useState<GameState>({
    targetWord: "",
    attempts: [],
    currentAttempt: "",
    maxAttempts: 5,
    gameOver: false,
    won: false,
  });

  useEffect(() => {
    setGameState((prev) => ({ ...prev, targetWord: getRandomWord() }));
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    if (value.length <= 4) {
      setGameState((prev) => ({ ...prev, currentAttempt: value }));
    }
  };

  const handleSubmit = () => {
    if (
      gameState.currentAttempt.length !== 4 ||
      !isValidWord(gameState.currentAttempt)
    ) {
      return;
    }

    const newAttempts = [...gameState.attempts, gameState.currentAttempt];
    const won = gameState.currentAttempt === gameState.targetWord;
    const gameOver = won || newAttempts.length >= gameState.maxAttempts;

    setGameState((prev) => ({
      ...prev,
      attempts: newAttempts,
      currentAttempt: "",
      gameOver,
      won,
    }));
  };

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      <h1 className="text-4xl font-bold">Jogo das Letras</h1>

      <div className="flex flex-col gap-4">
        {gameState.attempts.map((attempt, index) => (
          <div key={index} className="flex gap-2">
            {compareLetters(attempt, gameState.targetWord).map(
              (pixels, letterIndex) => (
                <LetterGrid key={letterIndex} pixels={pixels} />
              )
            )}
          </div>
        ))}
      </div>

      {!gameState.gameOver && (
        <div className="flex gap-4">
          <input
            type="text"
            value={gameState.currentAttempt}
            onChange={handleInput}
            className="px-4 py-2 border rounded"
            maxLength={4}
            placeholder="Digite uma palavra"
          />
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Tentar
          </button>
        </div>
      )}

      {gameState.gameOver && (
        <div className="text-center">
          <p className="text-xl font-bold mb-2">
            {gameState.won ? "Parabéns! Você venceu!" : "Fim de jogo!"}
          </p>
          <p>A palavra era: {gameState.targetWord}</p>
          <button
            onClick={() => {
              setGameState({
                targetWord: getRandomWord(),
                attempts: [],
                currentAttempt: "",
                maxAttempts: 5,
                gameOver: false,
                won: false,
              });
            }}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Jogar Novamente
          </button>
        </div>
      )}
    </div>
  );
};
