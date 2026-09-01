"use client";

import React from "react";
import { BackToOverview } from "./inline-navigation";
import { motion } from "framer-motion";
export default function About() {
  return (
    <section
      className="max-w-[31rem] text-left leading-8 scroll-mt-28"
      id="about"
    >
      <BackToOverview />
      <h1 className="mb-7 text-3xl font-medium tracking-[-0.045em] text-white sm:text-4xl">About</h1>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="space-y-5 text-left text-lg font-light text-white/80 sm:text-xl sm:leading-9"
      >
        <p>
          I build clear, reliable software for teams with real operational needs — from the first requirement to production.
        </p>
        <p>
          My toolkit spans React, Next.js, .NET, and relational data. I care most about calm architecture, useful workflows, and shipping work that lasts.
        </p>
      </motion.div>
    </section>
  );
}
