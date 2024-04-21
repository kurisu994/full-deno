import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

const ThemeProvider = (
  { children }: JSX.HTMLAttributes<HTMLButtonElement>,
) => {
  const handThemeChange = (e: any) => {
    if (e.matches) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  if (IS_BROWSER) {
    const darkThemeMq = globalThis.matchMedia("(prefers-color-scheme: dark)");
    darkThemeMq.addEventListener("change", handThemeChange);
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        darkThemeMq.matches)
    ) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }

  return (
    <>
      {children}
    </>
  );
};

export default ThemeProvider;
