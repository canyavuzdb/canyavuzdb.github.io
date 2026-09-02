"use client";

import SectionHeading from "./section-heading";
import { BackToOverview } from "./inline-navigation";
import { usePosts } from "@/lib/use-content";
import ContentBlocks from "./content-blocks";

export default function Thoughts() {
  const thoughts = usePosts("thought");

  return (
    <section id="thoughts" className="w-full max-w-[45rem] leading-8 scroll-mt-28">
      <BackToOverview />
      <SectionHeading>Thoughts</SectionHeading>
      <div className="mt-7 space-y-8">
        {thoughts.map((thought) => <article key={thought.id} className="border-l border-white/15 pl-5"><p className="text-xs font-mono text-white/40">{thought.published_at && new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(thought.published_at))}</p><h3 className="mt-2 text-lg font-medium text-white">{thought.title}</h3><div className="mt-3"><ContentBlocks blocks={thought.content_blocks} /></div></article>)}
      </div>
    </section>
  );
}
