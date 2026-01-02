"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { links } from "@/lib/data";
import clsx from "clsx";
import { useActiveLinkContext } from "@/context/active-link-context";

const CHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

type ScrambleLinkProps = {
  text: string;
  isActive: boolean;
  onClick: () => void;
};

const ScrambleLink = ({ text, isActive, onClick }: ScrambleLinkProps) => {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Function to generate random string of same length
  const getRandomString = (target: string) => {
    return target
      .split("")
      .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
      .join("");
  };

  const scramble = () => {
    let iteration = 0;
    clearInterval(intervalRef.current as NodeJS.Timeout);

    intervalRef.current = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split("")
          .map((char, index) => {
             // If this character is already "solved" (index < iteration), generate random for the rest
             // Actually, for "all mixed" resting state, let's flip logic.
             // But here we want to DECRYPT on hover.
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        clearInterval(intervalRef.current as NodeJS.Timeout);
        setDisplayText(text); // Ensure final fidelity
      }

      iteration += 1 / 3; // Speed of decryption
    }, 30);
  };

  const setRandomState = () => {
      clearInterval(intervalRef.current as NodeJS.Timeout);
      // Just set it to a static random string to start/reset
      setDisplayText(getRandomString(text));
  };

  // Initial mount: if not active, scramble it.
  useEffect(() => {
      if (!isActive) {
          setRandomState();
      } else {
          setDisplayText(text);
      }
  }, [isActive]);

  const handleMouseEnter = () => {
    scramble();
  };

  const handleMouseLeave = () => {
    if (!isActive) {
      setRandomState();
    }
  };

  return (
    <button
      className={clsx(
        "px-0 py-1 hover:text-white transition cursor-pointer italic tracking-normal font-mono uppercase text-center leading-none",
        {
          "text-white font-bold": isActive,
          "text-gray-500 font-normal": !isActive
        }
      )}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="transparent"
    >
      {displayText}
    </button>
  );
};

export default function Header() {
  const { activeLink, setActiveLink, setLastTimeClick } = useActiveLinkContext();

  return (
    <header className="z-[999] relative h-auto md:h-full flex items-center justify-center">
      <nav className="flex flex-row md:flex-col gap-4 md:gap-2 items-center bg-black/50 md:bg-transparent px-4 py-2 md:p-0 rounded-full md:rounded-none backdrop-blur-md md:backdrop-blur-none md:border-none">
        <ul className="flex flex-row md:flex-col items-center justify-center text-[0.7rem] font-medium text-gray-500 gap-4 md:gap-2">
          {links.map((link, index) => (
            <React.Fragment key={link.hash}>
              <motion.li
                className="relative flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="md:[writing-mode:vertical-rl] md:[text-orientation:upright]">
                    <ScrambleLink 
                        text={link.name} 
                        isActive={activeLink === link.name}
                        onClick={() => {
                            setActiveLink(link.name);
                            setLastTimeClick(Date.now());
                        }}
                    />
                </div>
              </motion.li>
              {index < links.length - 1 && (
                <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hidden md:block text-gray-800 h-[1px] w-3 bg-gray-800"
                ></motion.span>
              )}
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </header>
  );
}
