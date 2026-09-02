"use client";

import About from "@/components/about";
import Blog from "@/components/blog";
import Thoughts from "@/components/thoughts";
import Projects from "@/components/projects";
import Experience from "@/components/experience";

import { useActiveLinkContext } from "@/context/active-link-context";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { activeLink } = useActiveLinkContext();
  const isOverviewView = activeLink === "About" || activeLink === "Blog";

  return (
    <main className="min-h-screen text-white relative flex w-full flex-col items-center justify-start py-20 md:py-24">
        {isOverviewView && (
          <About>{activeLink === "Blog" && <Blog embedded />}</About>
        )}
        {!isOverviewView && <AnimatePresence mode="wait">
            <motion.div
                key={activeLink}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full flex-none custom-scrollbar"
            >
                {activeLink === "Thoughts" && <Thoughts />}
                {activeLink === "Work" && <Experience />}
                {activeLink === "Projects" && <Projects />}
            </motion.div>
        </AnimatePresence>}
    </main>
  );
}
