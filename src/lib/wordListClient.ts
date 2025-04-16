export const getRandomWord = async (): Promise<string> => {
  const response = await fetch("/api/words");
  const data = await response.json();
  return data.word;
};

export const checkWordValidity = async (word: string): Promise<boolean> => {
  const response = await fetch("/api/words", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ word }),
  });
  const data = await response.json();
  return data.isValid;
};
