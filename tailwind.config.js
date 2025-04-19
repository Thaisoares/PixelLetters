/** @type {import('tailwindcss').Config} */
import { theme as customTheme } from "./src/styles/theme";

export const content = [
  "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
];
export const theme = {
  extend: {
    colors: {
      "correct-letter": "#30bbc2",
      "correct-pixel": "#2ec242", //"#32b544", //10B981
      "wrong-pixel": "#c22d37 ", //"#b53535",
      "inactive-pixel": "#6B7280",
      error: {
        background: "#FEE2E2",
        text: "#B91C1C",
      },
      border: "#E5E7EB",
      keyboard: {
        background: "#E5E7EB",
        hover: "#d1d5db",
        text: "#001a23",
      },
      button: {
        background: "#002a36",
        hover: "#003949",
        text: "#b1e3e8",
      },
      background: "#F3F4F6",
      darkBackground: "#001a23",
      lightBlue: "#30bbc2",
    },
    width: {
      "letter-sm": "40px",
      "letter-md": "50px",
      "keyboard-sm": "32px",
      "keyboard-md": "40px",
    },
    height: {
      "letter-sm": "56px",
      "letter-md": "70px",
      "keyboard-sm": "40px",
      "keyboard-md": "50px",
    },
  },
};
