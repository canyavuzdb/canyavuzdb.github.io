"use client";

import { useActiveLinkContext } from "@/context/active-link-context";
import type { SectionLink } from "@/lib/types";

type NavItemProps = {
  label: SectionLink;
  index: number;
};

function NavItem({ label, index }: NavItemProps) {
  const { activeLink, setActiveLink, setLastTimeClick } = useActiveLinkContext();
  const isActive = activeLink === label;

  return (
    <button
      type="button"
      onClick={() => {
        setActiveLink(label);
        setLastTimeClick(Date.now());
      }}
      className={`border-b transition-colors ${
        isActive
          ? "border-current text-white"
          : "border-transparent text-white/55 hover:border-current hover:text-white"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <span>{label}</span>
      <sup className="ml-1 text-[0.62em] font-medium opacity-60">{index}</sup>
    </button>
  );
}

export default function InlineNavigation() {
  return (
    <nav aria-label="Portfolio sections" className="w-full max-w-[43rem] text-left">
      <p className="text-[0.9375rem] leading-7 tracking-[-0.01em] text-white/70 sm:text-base sm:leading-7">
        <NavItem label="About" index={1} /> is the starting point: a few notes on me and the way I see my work. When an idea asks for more space, it becomes a <NavItem label="Blog" index={2} /> post; when it is still brief, loose, or unresolved, it belongs in <NavItem label="Thoughts" index={3} />. I keep a record of my professional path in <NavItem label="Work" index={4} />, while <NavItem label="Projects" index={5} /> keeps the things I have brought to life.
      </p>
    </nav>
  );
}

export function BackToOverview() {
  const { setActiveLink, setLastTimeClick } = useActiveLinkContext();

  return (
    <button
      type="button"
      onClick={() => {
        setActiveLink("About");
        setLastTimeClick(Date.now());
      }}
      className="mb-7 border-b border-transparent text-sm text-white/55 transition-colors hover:border-current hover:text-white"
    >
      ← about
    </button>
  );
}
