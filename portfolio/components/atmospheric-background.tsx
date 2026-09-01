"use client";

import { useEffect, useRef } from "react";

export default function AtmosphericBackground() {
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const background = backgroundRef.current;
    if (!background) return;

    let frameId: number | null = null;
    let nextPosition = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const paintSpotlight = () => {
      background.style.setProperty("--spotlight-x", `${nextPosition.x}px`);
      background.style.setProperty("--spotlight-y", `${nextPosition.y}px`);
      frameId = null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      nextPosition = { x: event.clientX, y: event.clientY };
      background.dataset.active = "true";
      background.dataset.overColumn = String(
        event.target instanceof Element && Boolean(event.target.closest(".portfolio-column"))
      );
      if (frameId === null) frameId = requestAnimationFrame(paintSpotlight);
    };

    const handlePointerLeave = () => {
      background.dataset.active = "false";
      background.dataset.overColumn = "false";
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener("pointerleave", handlePointerLeave);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div ref={backgroundRef} className="atmospheric-background" data-active="false" aria-hidden="true">
      <div className="scene-layer scene-layer--night" />
      <div className="scene-layer scene-layer--day" />
    </div>
  );
}
