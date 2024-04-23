import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      boxShadow: {
        "wl": "0px 25px 25px rgba(0, 0, 0, 0.05)",
        "dl": "8px 8px 10px 5px rgba(255, 255, 255, 0.1)",
      },
    },
  },
} satisfies Config;
