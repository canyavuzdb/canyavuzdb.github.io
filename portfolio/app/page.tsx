"use client";

import About from "@/components/about";
import Blog from "@/components/blog";
import Thoughts from "@/components/thoughts";
import Projects from "@/components/projects";
import Experience from "@/components/experience";
import { useEffect } from "react";
import { preloadExperiences, preloadPosts, preloadPostsPage, preloadProjects } from "@/lib/use-content";

import { useActiveLinkContext } from "@/context/active-link-context";

export default function Home() {
  const { activeLink } = useActiveLinkContext();

  useEffect(() => {
    void Promise.allSettled([
      preloadPostsPage("blog", 1, 5),
      preloadPosts("thought"),
      preloadExperiences(),
      preloadProjects(),
    ]);
  }, []);
  const sectionContent = activeLink === "Blog"
    ? <Blog embedded />
    : activeLink === "Thoughts"
      ? <Thoughts embedded />
      : activeLink === "Work"
        ? <Experience embedded />
        : activeLink === "Projects"
          ? <Projects embedded />
          : undefined;

  return (
    <main className="min-h-screen text-white relative flex w-full flex-col items-center justify-start py-20 md:py-24">
      <About contentKey={activeLink}>{sectionContent}</About>
    </main>
  );
}
