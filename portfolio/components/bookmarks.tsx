"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { BackToOverview } from "./inline-navigation";
import SectionHeading from "./section-heading";
import { useBookmarks } from "@/lib/use-content";
import { supabase } from "@/lib/supabase";
import { usePinnedContent } from "@/lib/use-pinned-content";
import PinButton from "./pin-button";

const suggestionCategories = [
  "Developer tools",
  "Skills & learning",
  "Design",
  "Reading",
  "AI & automation",
  "Inspiration",
] as const;

function hostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export default function Bookmarks({ embedded = false }: { embedded?: boolean }) {
  const bookmarks = useBookmarks();
  const [category, setCategory] = useState("all");
  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const { isPinned, togglePinned } = usePinnedContent();

  const bookmarkCategories = useMemo(() => ["all", ...Array.from(new Set(bookmarks.map((bookmark) => bookmark.category)))], [bookmarks]);
  const visibleBookmarks = useMemo(
    () => bookmarks
      .filter((bookmark) => category === "all" || bookmark.category === category)
      .sort((first, second) => Number(isPinned(`bookmark:${second.id}`)) - Number(isPinned(`bookmark:${first.id}`))),
    [bookmarks, category, isPinned],
  );

  async function submitSuggestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!supabase) {
      setStatus("error");
      return;
    }

    const data = new FormData(form);
    setStatus("submitting");
    const { error } = await supabase.from("bookmark_suggestions").insert({
      url: String(data.get("url") ?? ""),
      email: String(data.get("email") ?? "") || null,
      suggested_category: String(data.get("category") ?? "") || null,
      note: String(data.get("note") ?? "") || null,
    });

    if (error) {
      setStatus("error");
      return;
    }

    form.reset();
    setStatus("success");
  }

  function closeSuggestion() {
    setIsSubmitOpen(false);
    setStatus("idle");
  }

  return (
    <section id="bookmarks" className="w-full max-w-[45rem] leading-8 scroll-mt-28">
      {!embedded && <BackToOverview />}
      {!embedded && <SectionHeading>Bookmarks</SectionHeading>}
      <nav aria-label="Filter bookmarks" className={`${embedded ? "" : "mt-7"} mb-7 flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.07] pb-5`}>
        <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs text-white/45">
          {bookmarkCategories.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} className={`border-b border-transparent pb-0.5 transition-colors hover:text-white ${category === item ? "border-current text-white" : ""}`}>
              {item}
            </button>
          ))}
        </div>
        <button type="button" onClick={() => setIsSubmitOpen(true)} className="px-1 py-1 text-sm font-light tracking-[0.01em] text-white/50 transition-colors hover:text-white/80">
          suggest a link
        </button>
      </nav>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={category}
          initial={{ opacity: 0, y: 8, filter: "blur(3px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -5, filter: "blur(2px)" }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="pb-16"
        >
          {visibleBookmarks.length === 0 ? (
            <p className="py-8 text-sm text-white/40">Nothing saved in this category yet.</p>
          ) : visibleBookmarks.map((bookmark, index) => (
            <article key={bookmark.id} className={`py-7 ${index > 0 ? "border-t border-white/10" : "pt-0"}`}>
              <div className="flex items-start justify-between gap-4">
                <a href={bookmark.url} target="_blank" rel="noreferrer" className="group min-w-0">
                  <h3 className="text-lg font-medium text-white transition-opacity group-hover:opacity-70">{bookmark.title} <span aria-hidden="true" className="text-white/35">↗</span></h3>
                  {bookmark.description && <p className="mt-1 text-sm leading-6 text-white/60">{bookmark.description}</p>}
                </a>
                <PinButton pinned={isPinned(`bookmark:${bookmark.id}`)} onToggle={() => togglePinned(`bookmark:${bookmark.id}`)} />
              </div>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem] font-mono uppercase tracking-[0.1em] text-white/30">
                <span>{bookmark.category}</span>
                <span aria-hidden="true">—</span>
                <span>{hostname(bookmark.url)}</span>
                {bookmark.tags.map((tag) => <span key={tag}>#{tag}</span>)}
              </div>
            </article>
          ))}
        </motion.div>
      </AnimatePresence>

      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {isSubmitOpen && (
          <motion.div className="bookmark-overlay fixed inset-0 z-50 flex items-center justify-center px-5 py-8 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={closeSuggestion}>
            <motion.div role="dialog" aria-modal="true" aria-labelledby="suggestion-title" className="bookmark-modal w-full max-w-lg rounded-2xl p-6 shadow-2xl" initial={{ opacity: 0, y: 12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8, scale: 0.98 }} onMouseDown={(event) => event.stopPropagation()}>
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h2 id="suggestion-title" className="bookmark-modal-title text-xl font-medium">Suggest a bookmark</h2>
                  <p className="bookmark-modal-copy mt-2 text-sm leading-6">Send a page you think is worth keeping. I review each suggestion before publishing it.</p>
                </div>
                <button type="button" onClick={closeSuggestion} aria-label="Close suggestion form" className="bookmark-modal-close text-2xl leading-none transition-colors">×</button>
              </div>

              {status === "success" ? (
                <div className="py-12 text-center">
                  <p className="bookmark-modal-title text-lg">Thanks — it&apos;s in the review queue.</p>
                  <button type="button" onClick={closeSuggestion} className="bookmark-modal-close mt-6 border-b text-sm">close</button>
                </div>
              ) : (
                <form className="mt-7 space-y-4" onSubmit={submitSuggestion}>
                  <label className="bookmark-modal-label block text-sm">Website URL
                    <input required name="url" type="url" placeholder="https://example.com" className="bookmark-modal-input mt-1.5 w-full rounded-lg px-3 py-2 text-base outline-none" />
                  </label>
                  <label className="bookmark-modal-label block text-sm">Email <span className="bookmark-modal-muted">(optional)</span>
                    <input name="email" type="email" placeholder="you@example.com" className="bookmark-modal-input mt-1.5 w-full rounded-lg px-3 py-2 text-base outline-none" />
                  </label>
                  <label className="bookmark-modal-label block text-sm">Category <span className="bookmark-modal-muted">(optional)</span>
                    <select name="category" className="bookmark-modal-input mt-1.5 w-full rounded-lg px-3 py-2 text-base outline-none">
                      <option value="">Choose a category</option>
                      {suggestionCategories.map((item) => <option key={item}>{item}</option>)}
                    </select>
                  </label>
                  <label className="bookmark-modal-label block text-sm">Why is it useful? <span className="bookmark-modal-muted">(optional)</span>
                    <textarea name="note" rows={3} className="bookmark-modal-input mt-1.5 w-full resize-y rounded-lg px-3 py-2 text-base outline-none" />
                  </label>
                  {status === "error" && <p className="text-sm text-red-300">This suggestion could not be sent. Please try again later.</p>}
                  <button type="submit" disabled={status === "submitting"} className="bookmark-modal-submit w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-opacity hover:opacity-85 disabled:cursor-wait disabled:opacity-50">
                    {status === "submitting" ? "sending…" : "send suggestion"}
                  </button>
                </form>
              )}
            </motion.div>
          </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </section>
  );
}
