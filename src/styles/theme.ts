export const theme = {
  colors: {
    // Main colors
    background: "#FFFFFF",
    darkBackground: "#111827",

    // Pixel colors
    pixel: {
      blue: "#00CED1", // Teal/cyan color for correct letters (from the image)
      green: "#10B981", // Green for pixels that must be included
      red: "#EF4444", // Red for pixels that must not be included
      gray: "#6B7280", // Gray for unknown pixels
      transparent: "transparent",
    },

    // UI colors
    border: "#E5E7EB",
    keyboard: {
      background: "#F3F4F6",
      key: "#FFFFFF",
      keyBorder: "#E5E7EB",
      text: "#111827",
    },

    // Notification colors
    error: {
      background: "#FEE2E2",
      text: "#B91C1C",
    },
  },

  // Sizing
  sizes: {
    letter: {
      sm: "3.5rem", // Small screens
      md: "4.5rem", // Medium screens and up
    },
    pixel: {
      sm: "0.4rem", // Small screens
      md: "0.5rem", // Medium screens and up
    },
    gap: {
      sm: "1px",
      md: "2px",
    },
  },

  // Border radius
  borderRadius: {
    sm: "0.125rem",
    md: "0.25rem",
    lg: "0.5rem",
  },
};

// Export the theme type
export type ThemeType = typeof theme;
