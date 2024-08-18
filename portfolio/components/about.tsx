"use client";

import React, { useEffect } from "react";
import SectionHeading from "./section-heading";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useActiveLinkContext } from "@/context/active-link-context";

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.75,
  });
  const { setActiveLink } = useActiveLinkContext();
  useEffect(() => {
    if (inView) {
      setActiveLink("About");
    }
  }, [inView, setActiveLink]);

  return (
    <motion.section
      ref={ref}
      className="mb-28 max-w-[45rem] text-center leading-8 sm:mb-40 scroll-mt-28"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.9 }}
      id="about"
    >
      <SectionHeading>About me</SectionHeading>
      <p className="mb-10">
        Born and raised in Istanbul, my journey into the world of technology
        began when I was 10, thanks to a computer my father brought home. This
        early introduction sparked a lifelong passion for technology, fueling a
        relentless curiosity and a drive to solve problems independently through
        online research and community forums. I've always embraced the{" "}
        <span className="font-medium">
          responsibilities that come with technology
        </span>
        , understanding that{" "}
        <span className="font-medium">continuous learning and adaptation</span>{" "}
        are essential to staying at the forefront of the field.
      </p>
      <p className="mb-10">
        My passion for problem-solving led me to pursue a degree in{" "}
        <span className="font-medium">Software Engineering</span>, where I
        successfully honed my skills and deepened my knowledge. Since then, I've
        been developing projects using{" "}
        <span className="font-medium">.NET and React/Next.js</span>, driven by
        the same curiosity and enthusiasm that first drew me to this field. For
        me, software development isn't just a profession—it's a hobby that I
        find deeply fulfilling.
      </p>
      <p className="mb-10">
        I'm now seeking a{" "}
        <span className="font-medium">full-time position</span> as a software
        developer, where I can apply my skills, contribute to innovative
        projects, and continue to grow in an environment that values continuous
        learning and technical excellence.
      </p>
      <p className="mb-10">
        When I'm not coding, I enjoy immersing myself in video games, watching
        movies, and playing basketball. I'm also passionate about learning new
        things; currently, I'm exploring the world of art and learning to play
        the piano.
      </p>
    </motion.section>
  );
}
