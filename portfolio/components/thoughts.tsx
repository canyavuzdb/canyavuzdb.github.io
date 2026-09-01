"use client";

import SectionHeading from "./section-heading";
import { BackToOverview } from "./inline-navigation";

export default function Thoughts() {
  return (
    <section id="thoughts" className="max-w-[45rem] text-center leading-8 scroll-mt-28">
      <div className="text-left"><BackToOverview /></div>
      <SectionHeading>Thoughts</SectionHeading>
      <p className="text-white/60 font-light text-lg">
        Short ideas, observations, and experiments will appear here.
      </p>
    </section>
  );
}
