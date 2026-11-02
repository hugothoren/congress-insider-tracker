import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0f4ff",
          100: "#dfe9ff",
          500: "#4f46e5",
          600: "#4338ca",
          700: "#3730a3",
        },
      },
      boxShadow: {
        soft: "0 20px 45px -20px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
