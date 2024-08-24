"use client";

import React, { useEffect } from "react";
import SectionHeading from "./section-heading";
import { projectsData } from "@/lib/data";
import Project from "./project";
import { useActiveLinkContext } from "@/context/active-link-context";
import { useInView } from "react-intersection-observer";

export default function Projects() {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  const { setActiveLink, LastTimeClick } = useActiveLinkContext();
  useEffect(() => {
    if (inView && Date.now() - LastTimeClick > 1000) {
      setActiveLink("Projects");
    }
  }, [inView, setActiveLink, LastTimeClick]);
  return (
    <section ref={ref} id="projects" className="scroll-mt-28">
      <SectionHeading>Projects worked on</SectionHeading>
      <div>
        {projectsData.map((project, index) => (
          <React.Fragment key={index}>
            <Project {...project} />
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}