"use client";

import SectionHeading from "./section-heading";
import { BackToOverview } from "./inline-navigation";
import { estimateReadingMinutes, type Post } from "@/lib/content";
import { usePostsPage } from "@/lib/use-content";
import ContentBlocks from "./content-blocks";
import { supabase } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePinnedContent } from "@/lib/use-pinned-content";
import PinButton from "./pin-button";

export default function Blog({ embedded = false }: { embedded?: boolean }) {
  const [page, setPage] = useState(1);
  const postPage = usePostsPage("blog", page, 5);
  const posts = postPage?.posts ?? [];
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [viewCounts, setViewCounts] = useState<Record<number, number>>({});
  const countedSlugs = useRef(new Set<string>());
  const { isPinned, togglePinned } = usePinnedContent();
  const orderedPosts = [...posts].sort((first, second) => Number(isPinned(`blog:${second.id}`)) - Number(isPinned(`blog:${first.id}`)));

  function changePage(nextPage: number) {
    if (!postPage || nextPage < 1 || nextPage > postPage.totalPages || nextPage === page) return;
    setPage(nextPage);
    window.requestAnimationFrame(() => document.getElementById("blog")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  useEffect(() => {
    if (!selectedPost?.slug || countedSlugs.current.has(selectedPost.slug) || !supabase) return;

    const storageKey = `portfolio:post-viewed:${selectedPost.slug}`;
    if (window.localStorage.getItem(storageKey)) return;

    countedSlugs.current.add(selectedPost.slug);
    supabase
      .rpc("increment_post_view", { target_slug: selectedPost.slug })
      .then(({ data, error }) => {
        if (!error && typeof data === "number") {
          window.localStorage.setItem(storageKey, "1");
          setViewCounts((current) => ({ ...current, [selectedPost.id]: data }));
          setSelectedPost((current) => current?.slug === selectedPost.slug ? { ...current, view_count: data } : current);
        }
      });
  }, [selectedPost?.id, selectedPost?.slug]);

  return (
    <section id="blog" className="w-full max-w-[45rem] leading-8 scroll-mt-28">
      {!embedded && <BackToOverview />}
      {!embedded && <SectionHeading>Blog</SectionHeading>}
      <AnimatePresence mode="wait" initial={false}>
        {selectedPost ? (
          <motion.article
            key={selectedPost.id}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className={embedded ? "" : "mt-7"}
          >
            <button type="button" onClick={() => setSelectedPost(null)} className="mb-7 border-b border-transparent text-sm text-white/45 transition-colors hover:border-current hover:text-white">
              ← all posts
            </button>
            <PinButton pinned={isPinned(`blog:${selectedPost.id}`)} onToggle={() => togglePinned(`blog:${selectedPost.id}`)} />
            <h1 className="text-2xl font-medium leading-tight text-white sm:text-3xl">{selectedPost.title}</h1>
            <p className="mt-4 text-sm text-white/45">{selectedPost.published_at && new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(selectedPost.published_at))} · {estimateReadingMinutes(selectedPost.content_blocks)} min read · {viewCounts[selectedPost.id] ?? selectedPost.view_count} views</p>
            <div className="mt-10"><ContentBlocks blocks={selectedPost.content_blocks} /></div>
          </motion.article>
        ) : (
          <motion.div
            key={`post-list-${page}`}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className={embedded ? "" : "mt-7"}
          >
            {orderedPosts.map((post, index) => (
              <article key={post.id} className={`blog-post-divider border-b py-7 ${index === 0 ? "pt-0" : ""}`}>
                <button type="button" onClick={() => setSelectedPost(post)} className="block w-full text-left">
                  <h3 className="text-lg font-medium text-white transition-opacity hover:opacity-70">{post.title}</h3>
                  {post.summary && <p className="mt-2 text-sm leading-6 text-white/60">{post.summary}</p>}
                </button>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <p className="text-[0.68rem] font-mono text-white/20">{post.published_at && new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(post.published_at))}· {estimateReadingMinutes(post.content_blocks)} min read · {viewCounts[post.id] ?? post.view_count} views</p>
                  <PinButton pinned={isPinned(`blog:${post.id}`)} onToggle={() => togglePinned(`blog:${post.id}`)} />
                </div>
              </article>
            ))}
            {postPage && postPage.totalPages > 1 && (
              <nav aria-label="Blog pagination" className="mt-8 flex items-center gap-4 text-xs font-mono text-white/35">
                <button type="button" onClick={() => changePage(page - 1)} disabled={page === 1} className="transition-opacity disabled:cursor-not-allowed disabled:opacity-30 hover:text-white">
                  ← previous
                </button>
                <div className="flex items-center gap-2" aria-label={`Page ${page} of ${postPage.totalPages}`}>
                  {Array.from({ length: postPage.totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                      type="button"
                      key={pageNumber}
                      onClick={() => changePage(pageNumber)}
                      aria-current={pageNumber === page ? "page" : undefined}
                      className={`min-w-4 transition-colors hover:text-white ${pageNumber === page ? "text-white" : ""}`}
                    >
                      {pageNumber}
                    </button>
                  ))}
                </div>
                <button type="button" onClick={() => changePage(page + 1)} disabled={page === postPage.totalPages} className="transition-opacity disabled:cursor-not-allowed disabled:opacity-30 hover:text-white">
                  next →
                </button>
              </nav>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
