"use client";

import { useActiveLinkContext } from "@/context/active-link-context";
import type { SectionLink } from "@/lib/types";

type NavItemProps = {
  label: SectionLink;
};

function NavItem({ label }: NavItemProps) {
  const { activeLink, setActiveLink, setLastTimeClick } = useActiveLinkContext();
  const isActive = activeLink === label;

  return (
    <button
      type="button"
      onClick={() => {
        setActiveLink(label);
        setLastTimeClick(Date.now());
      }}
      className={`inline border-b transition-colors ${
        isActive
          ? "border-current text-white"
          : "border-transparent text-white/55 hover:border-current hover:text-white"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      {label}
    </button>
  );
}

export default function InlineNavigation() {
  return (
    <nav aria-label="Portfolio sections" className="w-full max-w-[31rem] text-left">
      <p className="text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
        I&apos;m a full-stack developer based in Istanbul. Read <NavItem label="About" />, browse the <NavItem label="Blog" />, collect a few <NavItem label="Thoughts" />, see recent <NavItem label="Work" />, or explore <NavItem label="Projects" />.
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
        setActiveLink("Home");
        setLastTimeClick(Date.now());
      }}
      className="mb-7 border-b border-transparent text-sm text-white/55 transition-colors hover:border-current hover:text-white"
    >
      ← overview
    </button>
  );
}
