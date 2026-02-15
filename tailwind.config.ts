import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        obsidian: "#0A0A0A",
        gold: "#D4AF37",
        steel: "#8E8E93",
        luxury: {
          dark: "#0a0a0a",
          charcoal: "#1a1a1a",
          slate: "#2a2a2a",
          gold: "#d4af37",
          lightGold: "#f4d03f",
          silver: "#c0c0c0",
        },
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
