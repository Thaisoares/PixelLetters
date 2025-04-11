// src/lib/wordList.ts
export const WORD_LIST = [
  "AMOR",
  "CASA",
  "VIDA",
  "BOLA",
  "FATO",
  "MESA",
  "JOGO",
  "TIME",
  "ARTE",
  "MAPA",
];

export const getRandomWord = () => {
  return WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];
};

export const isValidWord = (word: string) => {
  return WORD_LIST.includes(word.toUpperCase());
};
