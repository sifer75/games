import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        pro: ["pro", "sans-serif"],
      },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg) translateY(var(--r))" },
          "100%": { transform: "rotate(360deg) translateY(var(--r))" },
        },
        collapse: {
          "0%": { transform: "rotate(var(--a)) translateY(var(--r))" },
          "100%": { transform: "rotate(var(--a)) translateY(30px)" },
        },
      },
      animation: {
        orbit: "orbit 12s linear infinite",
        collapse: "collapse 1.2s ease-in forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
