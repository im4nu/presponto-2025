import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      backgroundImage: {
        hero: "url('public/hero.png')",
      },
      colors: {
        main: "#8C5B62",
      },
    },
  },
  plugins: [],
} satisfies Config;
