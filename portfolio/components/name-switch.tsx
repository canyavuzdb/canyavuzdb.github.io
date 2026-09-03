"use client";

import { useState } from "react";

export default function NameSwitch() {
  const [usesLongName, setUsesLongName] = useState(false);
  return (
    <h1 className="name-switch text-2xl font-medium tracking-[-0.045em] text-white sm:text-3xl">
      <span>Yavuz,</span>
      <button
        type="button"
        className="name-switch-trigger"
        onClick={() => setUsesLongName((current) => !current)}
        aria-label={usesLongName ? "Show Can" : "Show Mehmet Can"}
        aria-pressed={usesLongName}
      >
        <span className="name-switch-viewport">
          <span className={`name-switch-track${usesLongName ? " is-switched" : ""}`}>
            <span className="name-switch-row">Can</span>
            <span className="name-switch-row">Mehmet Can</span>
          </span>
        </span>
      </button>
    </h1>
  );
}
