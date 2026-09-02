"use client";

import SectionHeading from "./section-heading";
import { BackToOverview } from "./inline-navigation";
import { estimateReadingMinutes, type Post } from "@/lib/content";
import { usePosts } from "@/lib/use-content";
import ContentBlocks from "./content-blocks";
import { supabase } from "@/lib/supabase";
import { useEffect, useRef, useState } from "react";

export default function Blog({ embedded = false }: { embedded?: boolean }) {
  const posts = usePosts("blog");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [viewCounts, setViewCounts] = useState<Record<number, number>>({});
  const countedSlugs = useRef(new Set<string>());

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
      <SectionHeading>Blog</SectionHeading>
      <div className="mt-7">
        {posts.map((post, index) => (
          <div key={post.id}>
            <button
              type="button"
              onClick={() => setSelectedPost((current) => current?.id === post.id ? null : post)}
              className={`blog-post-divider block w-full border-b py-7 text-left ${index === 0 ? "pt-0" : ""}`}
              aria-expanded={selectedPost?.id === post.id}
            >
              <h3 className="mt-2 text-lg font-medium text-white transition-opacity hover:opacity-70">{post.title}</h3>
              {post.summary && <p className="mt-2 text-sm leading-6 text-white/60">{post.summary}</p>}
              <p className="mt-3 text-[0.68rem] font-mono text-white/20">{post.published_at && new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(post.published_at))}· {estimateReadingMinutes(post.content_blocks)} min read · {viewCounts[post.id] ?? post.view_count} views</p>
            </button>
            {selectedPost?.id === post.id && (
              <article className={`blog-post-divider border-b py-8 ${index === posts.length - 1 ? "pb-0" : ""}`}>
                <ContentBlocks blocks={post.content_blocks} />
              </article>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
