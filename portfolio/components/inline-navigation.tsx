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
      className={`inline border-b transition-colors ${
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
    <nav aria-label="Portfolio sections" className="w-full max-w-[42rem] text-left">
      <p className="text-lg leading-8 text-white/70 sm:text-xl sm:leading-9">
        İstanbul&apos;da yaşayan bir full-stack developer olarak, kendimi ve üretim yaklaşımımı anlattığım <NavItem label="About" index={1} /> sayfasına göz atabilir; aklımdan geçenleri not aldığım <NavItem label="Blog" index={2} />&apos;de dolaşabilir; kısa fikirleri biriktirdiğim <NavItem label="Thoughts" index={3} />&apos;ü okuyabilir; hayatta kalmayı sevdiğim işi yaparak öğrendiğim <NavItem label="Work" index={4} />&apos;ü inceleyebilir ya da canlıda olan ve sırf keyif için geliştirdiğim <NavItem label="Projects" index={5} />&apos;e bakabilirsin.
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
