"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const greetings = [
  "Hello, I’m", // English
  "Merhaba, ben", // Turkish
  "Hei, olen", // Finnish
  "Hola, soy", // Spanish
  "Bonjour, je suis", // French
  "Ciao, sono", // Italian
  "Hallo, ich bin", // German
  "Olá, eu sou", // Portuguese
  "こんにちは、", // Japanese
  "안녕하세요, 저는", // Korean
  "你好，我是", // Chinese
  "Привет, я", // Russian
  "Hello, I’m", // Final state
];

type GreetingSwitchProps = {
  animate?: boolean;
};

export default function GreetingSwitch({ animate = false }: GreetingSwitchProps) {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setReduceMotion(mediaQuery.matches);
      if (mediaQuery.matches) setGreetingIndex(greetings.length - 1);
    };

    updateMotionPreference();
    mediaQuery.addEventListener("change", updateMotionPreference);

    return () => mediaQuery.removeEventListener("change", updateMotionPreference);
  }, []);

  useEffect(() => {
    if (!animate) setGreetingIndex(0);
  }, [animate]);

  useEffect(() => {
    if (!animate || reduceMotion || greetingIndex === greetings.length - 1) return;

    const timeout = window.setTimeout(() => {
      setGreetingIndex((currentIndex) => currentIndex + 1);
    }, 520);

    return () => window.clearTimeout(timeout);
  }, [animate, greetingIndex, reduceMotion]);

  if (!animate || reduceMotion) {
    return <p className="text-base text-white/55">Hello, I&apos;m</p>;
  }

  return (
    <p className="text-base text-white/55" aria-label="Hello, I&apos;m">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={greetings[greetingIndex]}
          initial={{ opacity: 0, y: 5, filter: "blur(2px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -5, filter: "blur(2px)" }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="inline-block"
        >
          {greetings[greetingIndex]}
        </motion.span>
      </AnimatePresence>
    </p>
  );
}
