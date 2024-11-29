import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white : "#fff",
        whitesmoke: "#f8f8f8",
        primary: "#1572d3",
        gray: "#242424",
        darkgray: "#acacac",
        silver: "#b6b6b6",
        darkslategray: "#3e3e3e",
        red: "#FF0000",
        smoke: "#EEEEEE",
        dimgray: "#666666",
        iconcolor: "#747474",
        lowblue: "#45A0FF",
        whiteblue: "#C1E0FF",
        line: "#e0e0e0",
        semiblue: "#f7fbff",
        lightred: "#ffcccc",
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
      xxl: "36px",
      xx: "24px",
      md: "20px",
      xl: "18px",
      inherit: "inherit"
    }
  },
  plugins: [],
};
export default config;
