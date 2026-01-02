"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { skillsData } from "@/lib/data";
import { motion } from "framer-motion";
export default function Skills() {
  return (
    <section
      id="skills"
      className="max-w-[53rem] scroll-mt-28 text-center"
    >
      <SectionHeading>Technical Skills</SectionHeading>
      <ul className="flex flex-wrap justify-center gap-2 text-lg text-gray-400">
        {skillsData.map((skill, index) => {
            const isSpecial = skill === "Seemingly Good at Searching";
            return (
                <motion.li
                className={`border border-white/20 px-5 py-3 text-sm uppercase tracking-widest transition cursor-default
                    ${isSpecial 
                        ? "bg-white text-black font-medium" 
                        : "bg-transparent text-white/80 hover:bg-white hover:text-black"
                    }`}
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                >
                {skill}
                </motion.li>
            );
        })}
      </ul>
    </section>
  );
}
