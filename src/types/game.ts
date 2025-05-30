// src/types/game.ts
export interface Pixel {
  row: number;
  col: number;
  color: "gray" | "green" | "red" | "blue";
}

export interface Letter {
  pixels: Pixel[];
}

export interface GameState {
  targetWord: string;
  attempts: string[];
  currentAttempt: string;
  maxAttempts: number;
  gameOver: boolean;
  won: boolean;
  evaluatedWords?: Pixel[][][];
}
