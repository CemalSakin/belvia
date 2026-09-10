/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        oled: "#000000",
        obsidian: "#09090b",
        glass: "#121215",
        cyan: "#06b6d4",
        teal: "#14b8a6",
        lime: "#84cc16",
        crimson: "#f43f5e"
      }
    }
  },
  plugins: []
};
