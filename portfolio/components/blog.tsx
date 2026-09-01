"use client";

import SectionHeading from "./section-heading";
import { BackToOverview } from "./inline-navigation";

export default function Blog() {
  return (
    <section id="blog" className="max-w-[45rem] text-center leading-8 scroll-mt-28">
      <div className="text-left"><BackToOverview /></div>
      <SectionHeading>Blog</SectionHeading>
      <p className="text-white/60 font-light text-lg">
        Articles and notes will live here.
      </p>
    </section>
  );
}
