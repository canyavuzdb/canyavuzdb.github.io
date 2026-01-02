"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/lib/data";
export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-28 w-full max-w-[45rem]">
      <SectionHeading>Experience</SectionHeading>
      <div className="flex flex-col gap-10">
        {experiencesData.map((item, index) => (
          <div key={index} className="flex flex-col border-l-2 border-white/10 pl-6 relative">
             <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-white/50"></div>
             <h3 className="font-semibold capitalize text-lg text-white tracking-wide">{item.title}</h3>
             <span className="font-mono text-xs text-gray-500 mb-2 mt-1">{item.location} | {item.date}</span>
             <p className="font-light text-gray-400 text-sm leading-relaxed mt-2 text-justify">
                {item.description}
             </p>
          </div>
        ))}
      </div>
    </section>
  );
}
