"use client";

import { useCallback, useEffect, useState } from "react";

type Theme = "night" | "day";

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("day");
  const [position, setPosition] = useState({ x: -100, y: -100 });

  const updatePosition = useCallback((activeTheme: Theme) => {
    const image = { width: 1672, height: 941 };
    const subject = activeTheme === "day"
      ? { x: 1235, y: 103 }
      : { x: 1235, y: 103 };
    const scale = Math.max(window.innerWidth / image.width, window.innerHeight / image.height);

    setPosition({
      x: (window.innerWidth - image.width * scale) / 2 + subject.x * scale,
      y: (window.innerHeight - image.height * scale) / 2 + subject.y * scale,
    });
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    const nextTheme: Theme = savedTheme === "night" ? "night" : "day";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    updatePosition(nextTheme);

    const handleResize = () => updatePosition(
      document.documentElement.dataset.theme === "day" ? "day" : "night"
    );
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [updatePosition]);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "night" ? "day" : "night";
    setTheme(nextTheme);
    applyTheme(nextTheme);
    window.localStorage.setItem("portfolio-theme", nextTheme);
    updatePosition(nextTheme);
  };

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === "night" ? "Switch to day theme" : "Switch to night theme"}
      title={theme === "night" ? "Day theme" : "Night theme"}
      style={{ left: position.x, top: position.y }}
    />
  );
}
