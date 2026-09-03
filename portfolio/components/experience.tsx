"use client";

import SectionHeading from "./section-heading";
import { BackToOverview } from "./inline-navigation";
import { useExperiences } from "@/lib/use-content";
export default function Experience({ embedded = false }: { embedded?: boolean }) {
  const experiences = useExperiences();
  return (
    <section id="work" className="scroll-mt-28 w-full max-w-[45rem] pb-24">
      {!embedded && <BackToOverview />}
      {!embedded && <SectionHeading>Work</SectionHeading>}
      <div className={embedded ? "" : "mt-7"}>
        <p className="mb-10 text-[0.9375rem] leading-7 tracking-[-0.01em] text-white/60 sm:text-base">A record of the work, study, and practical projects that have shaped how I build software.</p>
        {experiences.map((item, index) => (
          <article key={item.id} className={index > 0 ? "soft-divider mt-12 border-t pt-12" : ""}>
            {item.kind === "education" && <p className="mb-3 text-[0.68rem] font-mono uppercase tracking-[0.14em] text-white/35">Education</p>}
            <h3 className="text-xl font-medium tracking-[-0.02em] text-white">{item.company_name}</h3>
            <p className="mt-2 text-sm text-white/45">{[item.role, item.employment_type, item.location, `${new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(item.started_on))} — ${item.ended_on ? new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(item.ended_on)) : "Present"}`].filter(Boolean).join(" · ")}</p>
            <p className="mt-7 text-[0.95rem] leading-7 text-white/70">{item.description}</p>
            {item.highlights.length > 0 && <ul className="mt-6 space-y-3 text-[0.95rem] leading-7 text-white/65">{item.highlights.map((highlight) => <li key={highlight} className="flex gap-3"><span className="text-white/35">—</span><span>{highlight}</span></li>)}</ul>}
            {item.selected_work.length > 0 && <div className="mt-9"><p className="text-[0.68rem] font-mono uppercase tracking-[0.14em] text-white/35">Selected university work</p><div className="mt-5 space-y-7">{item.selected_work.map((work) => <div key={work.title}><h4 className="text-base font-medium text-white">{work.title}</h4><p className="mt-2 text-[0.95rem] leading-7 text-white/65">{work.description}</p></div>)}</div></div>}
          </article>
        ))}
      </div>
    </section>
  );
}
