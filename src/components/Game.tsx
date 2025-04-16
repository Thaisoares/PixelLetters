// src/components/Game.tsx
"use client";

import { useState, useEffect } from "react";
import { GameState } from "@/types/game";
import { compareLetters } from "@/lib/gameLogic";
import { VictoryModal } from "./VictoryModal";
import { GameGrid } from "./GameGrid";
import { Header } from "./Header";
import { Keyboard } from "./KeyBoard";
import { checkWordValidity, getRandomWord } from "@/lib/wordListClient";

interface GameProps {
  lengthWord: number;
}

export const Game = ({ lengthWord }: GameProps) => {
  const defaultWord = Array(lengthWord).fill(".").join("");
  const [gameState, setGameState] = useState<GameState>({
    targetWord: "",
    attempts: [],
    currentAttempt: defaultWord,
    maxAttempts: 5,
    gameOver: false,
    won: false,
    evaluatedWords: [],
  });
  const [error, setError] = useState<string>("");
  const [showVictory, setShowVictory] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<number>(1);

  const fetchNewWord = async () => {
    try {
      const response = await fetch("/api/words");
      const data = await response.json();
      setGameState((prev) => ({ ...prev, targetWord: data.word }));
    } catch (error) {
      console.error("Error fetching word:", error);
      setError("Erro ao carregar o jogo");
    }
  };

  useEffect(() => {
    const initGame = async () => {
      const word = await getRandomWord();
      setGameState((prev) => ({ ...prev, targetWord: word }));
    };
    initGame();
  }, []);

  const handleSubmit = async () => {
    if (gameState.currentAttempt.length !== 5) {
      setError("A palavra deve ter 5 letras");
      return;
    }

    const isValid = await checkWordValidity(gameState.currentAttempt);
    if (!isValid) {
      setError("Palavra inválida");
      return;
    }

    const evaluatedWord = compareLetters(
      gameState.currentAttempt,
      gameState.targetWord,
      gameState.attempts.length
    );

    const newAttempts = [...gameState.attempts, gameState.currentAttempt];
    const won = gameState.currentAttempt === gameState.targetWord;
    const gameOver = won || newAttempts.length >= gameState.maxAttempts;

    setGameState((prev) => ({
      ...prev,
      attempts: newAttempts,
      currentAttempt: defaultWord,
      gameOver,
      won,
      evaluatedWords: [...(prev.evaluatedWords || []), evaluatedWord],
    }));
    setCurrentPosition(1);
    console.log(gameState);

    if (won) {
      setShowVictory(true);
    }

    setError("");
  };

  // Add keyboard handling
  useEffect(() => {
    const handleKeyboardPress = (event: KeyboardEvent) => {
      if (gameState.gameOver) return;

      if (event.key === "Enter") {
        handleSubmit();
      } else if (event.key === "Backspace") {
        handleBackspacePress();
      } else if (/^[A-Za-z]$/.test(event.key)) {
        const letter = event.key.toUpperCase();
        handleKeyPress(letter);
      }
    };

    window.addEventListener("keydown", handleKeyboardPress);
    return () => window.removeEventListener("keydown", handleKeyboardPress);
  }, [gameState]);

  const handleKeyPress = (key: string) => {
    setError("");
    var index = currentPosition - 1;

    setGameState((prev) => {
      var chars = prev.currentAttempt.split("");
      chars[index] = key;
      return {
        ...prev,
        currentAttempt: chars.join(""),
      };
    });

    setCurrentPosition((prev) => {
      if (prev < 5) {
        return prev + 1;
      }
      return 5;
    });
  };

  const handleBackspacePress = () => {
    setError("");
    var index = currentPosition - 1;
    var chars = gameState.currentAttempt.split("");
    if (chars[index] == ".") {
      index -= 1;
    }
    chars[index] = ".";

    setGameState((prev) => {
      return {
        ...prev,
        currentAttempt: chars.join(""),
      };
    });

    setCurrentPosition(index + 1);
  };

  const handlePlayAgain = async () => {
    await fetchNewWord();
    setGameState((prev) => ({
      ...prev,
      attempts: [],
      currentAttempt: defaultWord,
      gameOver: false,
      won: false,
      evaluatedWords: [],
    }));
    setShowVictory(false);
  };
  console.log({ gameState, position: currentPosition });
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-lg mx-auto">
          <GameGrid
            {...gameState}
            currentPosition={currentPosition}
            setCurrentPosition={setCurrentPosition}
          />

          {error && (
            <div className="mt-4 p-4 bg-error-background text-error-text rounded text-center">
              {error}
            </div>
          )}

          <Keyboard
            onKeyPress={handleKeyPress}
            onEnter={handleSubmit}
            onBackspace={handleBackspacePress}
          />
        </div>
      </main>

      {showVictory && (
        <VictoryModal
          attempts={gameState.attempts.length}
          targetWord={gameState.targetWord}
          onPlayAgain={handlePlayAgain}
        />
      )}
    </div>
  );
};
