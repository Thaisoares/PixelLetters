"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { GameState, Pixel } from "@/types/game";
import { compareLetters } from "@/lib/gameLogic";
import { checkWordValidity, getRandomWord } from "@/lib/wordListClient";

interface GameContextType {
  gameState: GameState;
  currentPosition: number;
  error: string;
  showVictory: boolean;
  setShowVictory: (show: boolean) => void;
  handleKeyPress: (key: string) => void;
  handleBackspacePress: () => void;
  handleSubmit: () => void;
  setCurrentPosition: (position: number) => void;
  handlePlayAgain: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({
  children,
  lengthWord = 5,
}: {
  children: ReactNode;
  lengthWord?: number;
}) {
  const defaultWord = Array(lengthWord).fill(".").join("");
  const [gameState, setGameState] = useState<GameState>({
    targetWord: "",
    attempts: [],
    currentAttempt: defaultWord,
    maxAttempts: lengthWord,
    gameOver: false,
    won: false,
    evaluatedWords: [],
  });
  const [error, setError] = useState<string>("");
  const [showVictory, setShowVictory] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<number>(1);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize game
  useEffect(() => {
    const initGame = async () => {
      const word = await getRandomWord();
      setGameState((prev) => ({ ...prev, targetWord: word }));
    };

    if (isClient) {
      initGame();
    }
  }, [isClient, lengthWord]);

  // Handle keyboard events
  useEffect(() => {
    if (!isClient) return;

    const handleKeyboardPress = (event: KeyboardEvent) => {
      if (gameState.gameOver) return;

      if (event.key === "Enter") {
        handleSubmit();
      } else if (event.key === "Backspace") {
        handleBackspacePress();
      } else if (event.key === "ArrowLeft") {
        if (currentPosition > 1) {
          setCurrentPosition(currentPosition - 1);
        }
      } else if (event.key === "ArrowRight") {
        if (currentPosition < lengthWord) {
          setCurrentPosition(currentPosition + 1);
        }
      } else if (event.key === "Delete") {
        setGameState((prev) => ({ ...prev, targetWord: "VENTO" }));
      } else if (/^[A-Za-z]$/.test(event.key)) {
        const letter = event.key.toUpperCase();
        handleKeyPress(letter);
      }
    };

    window.addEventListener("keydown", handleKeyboardPress);
    return () => window.removeEventListener("keydown", handleKeyboardPress);
  }, [
    isClient,
    gameState.gameOver,
    currentPosition,
    lengthWord,
    gameState.currentAttempt,
  ]);

  const handleKeyPress = (key: string) => {
    setError("");
    const index = currentPosition - 1;

    setGameState((prev) => {
      const chars = prev.currentAttempt.split("");
      chars[index] = key;
      return {
        ...prev,
        currentAttempt: chars.join(""),
      };
    });

    const nextPosition = Math.min(lengthWord, currentPosition + 1);
    setCurrentPosition(nextPosition);
  };

  const handleBackspacePress = () => {
    setError("");
    let index = currentPosition - 1;

    setGameState((prev) => {
      const chars = prev.currentAttempt.split("");

      if (chars[index] === ".") {
        index = index === 0 ? 0 : index - 1;
      }

      chars[index] = ".";

      return {
        ...prev,
        currentAttempt: chars.join(""),
      };
    });

    setCurrentPosition(index + 1);
  };

  const handleSubmit = async () => {
    if (gameState.currentAttempt.length !== lengthWord) {
      setError(`A palavra deve ter ${lengthWord} letras`);
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

    if (won) {
      setShowVictory(true);
    }

    setError("");
  };

  const handlePlayAgain = async () => {
    const word = await getRandomWord();
    setGameState({
      targetWord: word,
      attempts: [],
      currentAttempt: defaultWord,
      maxAttempts: lengthWord,
      gameOver: false,
      won: false,
      evaluatedWords: [],
    });
    setShowVictory(false);
    setCurrentPosition(1);
    setError("");
  };

  const value = {
    gameState,
    currentPosition,
    error,
    showVictory,
    setShowVictory,
    handleKeyPress,
    handleBackspacePress,
    handleSubmit,
    setCurrentPosition,
    handlePlayAgain,
  };

  // Only render children when on client
  if (!isClient) {
    return <div>Loading...</div>;
  }

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

// Custom hook to use the game context
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
}
