"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type Pose = {
  name: string;
  x: number;
  y: number;
};

const poses: Pose[] = [
  { name: "right", x: 100, y: 50 },
  { name: "down-right", x: 100, y: 100 },
  { name: "down", x: 50, y: 100 },
  { name: "down-left", x: 0, y: 100 },
  { name: "left", x: 0, y: 50 },
  { name: "up-left", x: 0, y: 0 },
  { name: "up", x: 50, y: 0 },
  { name: "up-right", x: 100, y: 0 },
];

const neutralPose = { name: "center", x: 50, y: 50 };

// App-router page transitions remount this component. Keep the last visual pose
// at module scope so the next page renders it immediately, before a new pointer event.
let carriedGaze = {
  pose: neutralPose as Pose,
  tilt: { pitch: 0, yaw: 0 },
};

export default function ProfileCard() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const [activePose, setActivePose] = useState<Pose>(() => carriedGaze.pose);
  const [tilt, setTilt] = useState(() => carriedGaze.tilt);

  useEffect(() => {
    const portrait = portraitRef.current;
    if (!portrait) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)");
    let frameId: number | null = null;
    let lastSector: number | null = poses.findIndex((pose) => pose.name === carriedGaze.pose.name);
    if (lastSector === -1) lastSector = null;
    let pointer = { x: 0, y: 0 };

    const reset = () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
      lastSector = null;
      carriedGaze = { pose: neutralPose, tilt: { pitch: 0, yaw: 0 } };
      setActivePose(neutralPose);
      setTilt({ pitch: 0, yaw: 0 });
    };

    const update = () => {
      frameId = null;
      const rect = portrait.getBoundingClientRect();
      const x = pointer.x - (rect.left + rect.width / 2);
      const y = pointer.y - (rect.top + rect.height / 2);

      if (Math.hypot(x, y) < 42) {
        reset();
        return;
      }

      const angle = Math.atan2(y, x);
      const sector = (Math.round(angle / (Math.PI / 4)) + 8) % 8;
      const previousAngle = lastSector === null ? angle : lastSector * Math.PI / 4;
      const difference = Math.abs(Math.atan2(Math.sin(angle - previousAngle), Math.cos(angle - previousAngle)));

      if (lastSector === null || difference > Math.PI / 8 + 0.055) {
        lastSector = sector;
        carriedGaze = { ...carriedGaze, pose: poses[sector] };
        setActivePose(poses[sector]);
      }

      const nextTilt = {
        pitch: Math.max(-3, Math.min(3, -y / 95)),
        yaw: Math.max(-3, Math.min(3, x / 110)),
      };
      carriedGaze = { ...carriedGaze, tilt: nextTilt };
      setTilt(nextTilt);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch" || reducedMotion.matches || !finePointer.matches) return;
      pointer = { x: event.clientX, y: event.clientY };
      if (frameId === null) frameId = requestAnimationFrame(update);
    };

    const handleGazeTarget = (event: Event) => {
      if (reducedMotion.matches || !finePointer.matches) return;
      const target = event as CustomEvent<{ x: number; y: number; navigationTarget?: boolean }>;
      pointer = target.detail;
      const rect = portrait.getBoundingClientRect();
      const x = pointer.x - (rect.left + rect.width / 2);
      const rawY = pointer.y - (rect.top + rect.height / 2);
      // Navigation sits on a broad horizontal line. Weighting its vertical
      // distance matches the direction a visitor perceives, rather than
      // letting a long horizontal gap flatten every target into "right".
      const y = rawY * (target.detail.navigationTarget ? 1.65 : 1);

      if (Math.hypot(x, y) < 42) {
        reset();
        return;
      }

      const sector = (Math.round(Math.atan2(y, x) / (Math.PI / 4)) + 8) % 8;
      const nextTilt = {
        pitch: Math.max(-3, Math.min(3, -y / 95)),
        yaw: Math.max(-3, Math.min(3, x / 110)),
      };
      lastSector = sector;
      carriedGaze = { pose: poses[sector], tilt: nextTilt };
      setActivePose(poses[sector]);
      setTilt(nextTilt);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("portfolio:gaze-target", handleGazeTarget);
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("mouseleave", reset);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("portfolio:gaze-target", handleGazeTarget);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("mouseleave", reset);
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={portraitRef}
      className="gaze-avatar"
      role="img"
      aria-label="Illustrated portrait of Mehmet Can Yavuz that follows the cursor"
      style={{
        "--frame-x": `${activePose.x}%`,
        "--frame-y": `${activePose.y}%`,
        "--gaze-pitch": `${tilt.pitch}deg`,
        "--gaze-yaw": `${tilt.yaw}deg`,
      } as CSSProperties}
      data-gaze={activePose.name}
    >
      <span className="gaze-avatar-frame gaze-avatar-frame-a" aria-hidden="true" />
      <span className="gaze-avatar-frame gaze-avatar-frame-b" aria-hidden="true" />
    </div>
  );
}
