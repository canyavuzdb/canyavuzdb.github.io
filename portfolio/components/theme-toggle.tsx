"use client";

import { useCallback, useEffect, useState } from "react";

type Theme = "night" | "day";

const sceneMetrics = {
  day: {
    image: { width: 1668, height: 943 },
    subject: { x: 1235, y: 103 },
    offset: { x: 0.0065, y: 0.0032 },
  },
  night: {
    image: { width: 1687, height: 932 },
    subject: { x: 1235, y: 103 },
    offset: { x: 0, y: 0 },
  },
} as const;

const applyTheme = (theme: Theme) => {
  document.documentElement.dataset.theme = theme;
  const favicon = document.querySelector<HTMLLinkElement>("#theme-favicon");
  favicon?.setAttribute("href", theme === "day" ? "/favicon-dark.svg" : "/favicon-light.svg");
};

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("day");
  const [position, setPosition] = useState({ x: -100, y: -100 });

  const updatePosition = useCallback((activeTheme: Theme) => {
    const { image, subject, offset } = sceneMetrics[activeTheme];
    const scale = Math.max(window.innerWidth / image.width, window.innerHeight / image.height);
    const renderedWidth = image.width * scale;
    const renderedHeight = image.height * scale;

    setPosition({
      x: (window.innerWidth - renderedWidth) / 2 + subject.x * scale + window.innerWidth * offset.x,
      y: (window.innerHeight - renderedHeight) / 2 + subject.y * scale + window.innerHeight * offset.y,
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
    window.visualViewport?.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("resize", handleResize);
    };
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
