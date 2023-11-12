"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
interface themeContextType {
  mode: string;
  setMode: (mode: string) => void;
}
const ThemeContext = createContext<themeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<string>("");
  const handleThemeChange = () => {
    if (
      // check if prefered use browser theme is dark
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };
  useEffect(() => {
    handleThemeChange();
  }, [mode]);
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("use Theme must be used within a themeProvider");
  }
  return context;
}
