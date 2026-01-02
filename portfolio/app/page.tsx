"use client";

import Intro from "@/components/intro";
import About from "@/components/about";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
import Experience from "@/components/experience";
import Contact from "@/components/contact";

import SmoothCursor from "@/components/smooth-cursor";
import { useActiveLinkContext } from "@/context/active-link-context";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { activeLink } = useActiveLinkContext();

  return (
    <main className="h-full text-white relative flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
            <motion.div
                key={activeLink}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full max-w-[50rem] flex-none h-full flex flex-col items-center justify-start md:justify-center p-4 pt-28 md:pt-4 overflow-y-auto text-center custom-scrollbar"
            >
                {activeLink === "Home" && <Intro />}
                {activeLink === "About" && <About />}
                {activeLink === "Projects" && <Projects />}
                {activeLink === "Skills" && <Skills />}
                {activeLink === "Experience" && <Experience />}

                {activeLink === "Contact" && <Contact />}
            </motion.div>
        </AnimatePresence>
        <SmoothCursor />
    </main>
  );
}
