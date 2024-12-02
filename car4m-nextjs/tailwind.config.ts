import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
     './src/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      aspectRatio: {
        '4/3': '4 / 3',
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        white : "#fff",
        whitesmoke: "#f6f6f6",
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
        
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },

      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },

      "spacing": {},
      fontFamily: {
        baloo: "Baloo",
        "baloo-2": "'Baloo 2'"
      }
    },
    fontSize: {
      base: "16px",
      sm: "16px",
      xxl: "36px",
      xx: "24px",
      md: "20px",
      xl: "18px",
      inherit: "inherit"
    }
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
