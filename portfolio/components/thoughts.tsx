"use client";

import SectionHeading from "./section-heading";
import { BackToOverview } from "./inline-navigation";
import { usePosts } from "@/lib/use-content";
import ContentBlocks from "./content-blocks";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePinnedContent } from "@/lib/use-pinned-content";
import PinButton from "./pin-button";

const filters = ["all", "build", "read", "think"] as const;
type ThoughtFilter = typeof filters[number];

function formatEntryTime(value: string) {
  const entryDate = new Date(value);
  const differenceInDays = Math.max(0, Math.floor((Date.now() - entryDate.getTime()) / 86_400_000));
  const relativeTime = differenceInDays < 30
    ? (differenceInDays === 0 ? "today" : `${differenceInDays}d ago`)
    : differenceInDays < 365
      ? `${Math.floor(differenceInDays / 30)}mo ago`
      : `${Math.floor(differenceInDays / 365)}y ago`;

  const time = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }).format(entryDate);
  return `${time} · ${relativeTime}`;
}

export default function Thoughts({ embedded = false }: { embedded?: boolean }) {
  const thoughts = usePosts("thought");
  const [filter, setFilter] = useState<ThoughtFilter>("all");
  const { isPinned, togglePinned } = usePinnedContent();
  const visibleThoughts = useMemo(
    () => thoughts
      .filter((thought) => filter === "all" || (thought.category ?? "think") === filter)
      .sort((first, second) => Number(isPinned(`thought:${second.id}`)) - Number(isPinned(`thought:${first.id}`))),
    [filter, isPinned, thoughts],
  );

  return (
    <section id="thoughts" className="w-full max-w-[45rem] leading-8 scroll-mt-28">
      {!embedded && <BackToOverview />}
      {!embedded && <SectionHeading>Thoughts</SectionHeading>}
      <nav aria-label="Filter thoughts" className={`${embedded ? "" : "mt-7 "}mb-10 flex items-center gap-5 text-xs text-white/40`}>
        {filters.map((item) => (
          <button key={item} type="button" onClick={() => setFilter(item)} className={`border-b border-transparent pb-0.5 transition-colors hover:text-white ${filter === item ? "border-current text-white" : ""}`}>
            {item}
          </button>
        ))}
      </nav>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -5, filter: "blur(2px)" }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="space-y-0 pb-16"
        >
          {visibleThoughts.length === 0 ? (
            <p className="py-8 text-sm text-white/40">No thoughts in {filter} yet.</p>
          ) : visibleThoughts.map((thought, index) => (
              <article key={thought.id} className={index > 0 ? "soft-divider mt-12 border-t pt-12" : ""}>
                <div className="flex items-center justify-between gap-4 text-[0.68rem] font-mono uppercase tracking-[0.12em] text-white/35">
                  <div className="flex items-center gap-3"><span>{thought.category ?? "think"}</span><span aria-hidden="true" className="text-white/30">—</span><PinButton pinned={isPinned(`thought:${thought.id}`)} onToggle={() => togglePinned(`thought:${thought.id}`)} /></div>
                  <time className="thought-entry-date" dateTime={thought.created_at}>{formatEntryTime(thought.created_at)}</time>
                </div>
                <div className="mt-5"><ContentBlocks blocks={thought.content_blocks} /></div>
              </article>
            ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
