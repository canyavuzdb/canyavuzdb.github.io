"use client";

import Image from "next/image";
import { useState } from "react";

export default function ProfileCard() {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <button
      type="button"
      className={`profile-card${isFlipped ? " is-flipped" : ""}`}
      onClick={() => setIsFlipped((current) => !current)}
      aria-label={isFlipped ? "Show pixel-art portrait" : "Show portrait photo"}
      aria-pressed={isFlipped}
    >
      <span className="profile-card-inner">
        <span className="profile-card-face profile-card-front">
          <Image
            src="/profile-photo-pixel.png"
            alt="Pixel-art portrait of Mehmet Can Yavuz"
            fill
            sizes="64px"
            className="object-cover"
            priority
          />
        </span>
        <span className="profile-card-face profile-card-back">
          <Image
            src="/profile-photo.jpg"
            alt="Mehmet Can Yavuz"
            fill
            sizes="64px"
            className="object-cover"
          />
        </span>
      </span>
    </button>
  );
}
