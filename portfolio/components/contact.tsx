"use client";

import React from "react";
import SectionHeading from "./section-heading";
export default function Contact() {
  return (
    <section id="contact" className="text-center h-full flex flex-col justify-center">
      <SectionHeading>Contact</SectionHeading>
      <a
        className="text-xl sm:text-2xl font-light text-white hover:text-gray-300 transition underline decoration-1 underline-offset-4 break-all" 
        href="mailto:q2V2r@example.com"
      >   
        mcanyvz1996@gmail.com
      </a>
    </section>
  );
}
