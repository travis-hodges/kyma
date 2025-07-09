import { defineConfig } from '@tailwindcss/vite'

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#111", // matches .values background and site bg
        foreground: "#fff", // matches site text color
        border: "#333", // matches border color in .value-card
        'muted-foreground': "#94a3b8", // for text-muted-foreground
        muted: "#334155", // for bg-muted if used
      }
    }
  }
} 