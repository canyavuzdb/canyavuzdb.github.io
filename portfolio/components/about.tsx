"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";

export default function About() {
  return (
    <motion.section
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-10">
        Born and raised in Istanbul and introduced to technology with the
        computer brought home by his father when he was 10 years old, from that
        day to this day, he has been a young man who knows the{" "}
        <span className="font-medium">responsibilities of technology</span>, the
        passion for{" "}
        <span className="italic">
          solving problems by researching on forums
        </span>{" "}
        on the internet on his own, and the responsibilities of continuous
        learning and adaptation, and always fulfills his hobby rather than just
        a job without losing his deep curiosity and stepped into the{" "}
        <span className="font-medium">software development sector</span>. Taking
        his pleasure of problem solving to the next level, he successfully
        completed his education by studying{" "}
        <span className="font-medium">software engineering</span> at the
        university and continues to develop projects with{" "}
        <span className="font-medium">.Net and React/Next.js</span>. And
        currently looking for a{" "}
        <span className="font-medium">full-time position</span> as a software
        developer.
      </p>

      <p>
        <span className="italic">When I'm not coding</span>, I enjoy playing
        video games, watching movies, and playing basketball. I also enjoy{" "}
        <span className="font-medium">learning new things</span>. I am currently
        learning about <span className="font-medium">art</span>. I'm also
        learning how to play the piano.
      </p>
    </motion.section>
  );
}
