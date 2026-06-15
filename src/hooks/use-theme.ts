import { useEffect, useState } from "react";

export type Theme = "light" | "dark";

function getInitial(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

/**
 * Reads/sets the `dark` class on <html> and persists to localStorage.
 * The initial class is applied by an inline script in RootShell (before paint)
 * so there is no flash of the wrong theme; this hook just keeps React in sync.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(getInitial);

  // keep state in sync if the class was set before hydration
  useEffect(() => {
    setTheme(getInitial());
  }, []);

  const apply = (next: Theme) => {
    setTheme(next);
    const root = document.documentElement;
    root.classList.toggle("dark", next === "dark");
    try { localStorage.setItem("cc-theme", next); } catch {}
  };

  const toggle = () => apply(theme === "dark" ? "light" : "dark");

  return { theme, toggle, setTheme: apply };
}
