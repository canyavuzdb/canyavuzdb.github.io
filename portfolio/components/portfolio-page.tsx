"use client";

import { useEffect } from "react";
import About from "@/components/about";
import { preloadExperiences, preloadPosts, preloadPostsPage, preloadProjects } from "@/lib/use-content";
import type { SectionLink } from "@/lib/types";

type PortfolioPageProps = {
  section: SectionLink;
  children?: React.ReactNode;
};

export default function PortfolioPage({ section, children }: PortfolioPageProps) {
  useEffect(() => {
    void Promise.allSettled([
      preloadPostsPage("blog", 1, 5),
      preloadPosts("thought"),
      preloadExperiences(),
      preloadProjects(),
    ]);
  }, []);

  return (
    <main className="min-h-screen text-white relative flex w-full flex-col items-center justify-start py-20 md:py-24">
      <About contentKey={section}>{children}</About>
    </main>
  );
}
