import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem", xl: "2.5rem" },
      screens: { "2xl": "1280px" }
    },
    extend: {
      colors: {
        ink: "#0A0A0A",
        mute: "#5C6473",
        surface: "#F7F6F2",
        border: "#E5E2D9",
        primary: { DEFAULT: "#0B1F3A", 600: "#0B1F3A", 700: "#091732", 800: "#070F23" },
        accent: { DEFAULT: "#C9A35B", 600: "#B68F46", 700: "#9A7937" },
        success: "#1F7A5A",
        danger: "#B23A3A"
      },
      fontFamily: {
        display: ["var(--font-display)", "Fraunces", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        ar: ["var(--font-ar)", "IBM Plex Sans Arabic", "system-ui", "sans-serif"]
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem,5.5vw,5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.25rem,4.2vw,3.75rem)", { lineHeight: "1.08", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(1.75rem,3vw,2.75rem)", { lineHeight: "1.12", letterSpacing: "-0.01em" }]
      },
      borderRadius: { sm: "4px", DEFAULT: "8px", md: "12px", lg: "16px", xl: "24px" },
      boxShadow: {
        soft: "0 1px 2px rgba(11,31,58,.06), 0 8px 24px rgba(11,31,58,.06)",
        ring: "0 0 0 2px #C9A35B"
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.2, 0.6, 0.2, 1)"
      }
    }
  },
  plugins: []
};

export default config;
