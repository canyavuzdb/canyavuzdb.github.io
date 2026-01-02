"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import { motion } from "framer-motion";
import { BsGithub, BsArrowUpRight } from "react-icons/bs";
import Image from "next/image";

export default function Projects() {
  return (
    <section id="projects" className="w-full h-full flex flex-col justify-start md:justify-center pt-4 md:pt-0">
      <SectionHeading>Selected Works</SectionHeading>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12 sm:gap-y-10 mt-4 sm:mt-8 pb-32 sm:pb-0">
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} index={index} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

type ProjectProps = (typeof projectsData)[number] & { index: number };

function Project({ title, description, tags, index }: ProjectProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col items-start text-left"
    >
      <div className="w-full flex-col items-baseline border-b border-white/10 pb-2 mb-3">
        <div className="flex justify-between w-full items-center">
             <h3 className="text-lg font-medium text-white group-hover:text-white/80 transition-colors">
                {title}
            </h3>
            <span className="text-[0.6rem] font-mono text-white/40 tracking-widest uppercase">
                0{index + 1}
            </span>
        </div>
      </div>

      <p className="text-white/60 text-xs leading-5 mb-4 font-light min-h-[5rem]">
        {description}
      </p>

      <ul className="flex flex-wrap gap-1.5 mt-auto">
        {tags.map((tag, index) => (
          <li
            key={index}
            className="px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-white/80 border border-white/10 rounded hover:bg-white hover:text-black transition-all"
          >
            {tag}
          </li>
        ))}
      </ul>
      
      <div 
        className="absolute inset-0 z-10" 
        data-cursor="hover"
      />
    </motion.div>
  );
}
