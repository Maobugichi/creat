import { useState, useEffect } from "react";


export type Theme = "light" | "dark" | "system";

export function nextTheme(current: Theme): Theme {
  return current === "system" ? "light" : current === "light" ? "dark" : "system";
}

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("theme") as Theme) ?? "system";
  });

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");

    function apply() {
      const isDark = theme === "dark" || (theme === "system" && mq.matches);
      root.classList.toggle("dark", isDark);
    }

    apply();
    localStorage.setItem("theme", theme);

    if (theme === "system") {
      mq.addEventListener("change", apply);
      return () => mq.removeEventListener("change", apply);
    }
  }, [theme]);

  return { theme, setTheme: setThemeState };
}



export function useDarkMode(): boolean {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    const check = () =>
      setIsDark(document.documentElement.classList.contains("dark")); // ← class only

    check();

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", check); // still needed for "system" theme reacting to OS changes

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      mq.removeEventListener("change", check);
      observer.disconnect();
    };
  }, []);

  return isDark;
}