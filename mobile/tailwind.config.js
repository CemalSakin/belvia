/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: "#1D1D1F",
        muted: "#6E6E73",
        faint: "#8E8E93",
        fill: "#F2F2F4",
        line: "rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};
