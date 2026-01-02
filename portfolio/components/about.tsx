"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
export default function About() {
  return (
    <section
      className="max-w-[45rem] text-center leading-8 scroll-mt-28"
      id="about"
    >
      <SectionHeading>About Me</SectionHeading>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-white/80 font-light text-lg space-y-6 text-justify"
      >
        <p>
          When I was 5 years old, I had an Atari and played games. When I was 8, I had a computer and was constantly breaking it to understand how it worked. My story is very long, but the main point is that the time I spend with computers is a way of life for me.
        </p>
        <p>
          Even when I wake up in the morning and eat my avocado toast, I'm actually coding. Whether I'm drinking my long-brewed American coffee at work or eating dinner when I get home in the evening, developing something is always the only real thing for me.
        </p>
        <p>
          Alongside this, I have a social life, a sports life, and an obsession with healthy eating that I never neglect. The healthier I am psychologically, the healthier the products I develop are. If you've read this far, thank you for putting up with this strange text about me.
        </p>
      </motion.div>
    </section>
  );
}
