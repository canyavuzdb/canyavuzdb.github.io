"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { useSectionInView } from "@/lib/hooks";

export default function Contact() {
    const { ref } = useSectionInView("Contact");
  return (
    <section id="contact" ref={ref}>
      <SectionHeading>Contact Me!</SectionHeading>
      <p className="mb-10">
        Feel free to reach out to me at{" "}    
        <a
          className="text-blue-500 hover:underline" 
          href="mailto:q2V2r@example.com"
        >   
          q2V2r@example.com
        </a>
      </p>
    </section>
  );
}
