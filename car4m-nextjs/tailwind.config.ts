import type { Config } from "tailwindcss";

const config: Config = {
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
        white : "#fff",
        primary: "#1572d3",
        gray: "#242424",
        darkgray: "#acacac",
        silver: "#b6b6b6",
        darkslategray: "#3e3e3e"
      },
      "spacing": {},
      fontFamily: {
        baloo: "Baloo",
        "baloo-2": "'Baloo 2'"
      }
    },
    fontSize: {
      base: "16px",
      sm: "14px",
      inherit: "inherit"
    }
  },
  plugins: [],
};
export default config;
