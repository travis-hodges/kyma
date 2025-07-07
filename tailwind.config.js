module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui")
  ],
  daisyui: {
    themes: [
      {
        kyma: {
          "primary": "#0ea5e9",
          "secondary": "#38bdf8",
          "accent": "#a855f7",
          "neutral": "#1e293b",
          "base-100": "#ffffff"
        },
        darkkyma: {
          "primary": "#38bdf8",
          "secondary": "#0ea5e9",
          "accent": "#c084fc",
          "neutral": "#f1f5f9",
          "base-100": "#0f172a"
        }
      }
    ]
  }
};