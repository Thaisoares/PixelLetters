import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import path from "path";

let wordList: string[] = [];

const loadWordList = () => {
  try {
    const filePath = path.join(process.cwd(), "src/utils/words-pt-5.txt");
    const fileContent = readFileSync(filePath, "utf-8");
    wordList = fileContent
      .split("\n")
      .map((word) => word.trim().toUpperCase())
      .filter((word) => word.length === 5);
  } catch (error) {
    console.error("Error loading word list:", error);
    wordList = [];
  }
};

export async function GET() {
  if (wordList.length === 0) {
    loadWordList();
  }
  const randomWord = wordList[Math.floor(Math.random() * wordList.length)];
  return NextResponse.json({ word: randomWord });
}

export async function POST(request: Request) {
  if (wordList.length === 0) {
    loadWordList();
  }

  const { word } = await request.json();
  const isValid = wordList.includes(word.toUpperCase());

  return NextResponse.json({ isValid });
}
