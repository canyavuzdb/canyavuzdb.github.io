"use client";

import SectionHeading from "./section-heading";
import { BackToOverview } from "./inline-navigation";
import { useExperiences } from "@/lib/use-content";
export default function Experience({ embedded = false }: { embedded?: boolean }) {
  const experiences = useExperiences();
  return (
    <section id="work" className="scroll-mt-28 w-full max-w-[45rem] flex flex-col justify-start md:justify-center h-auto md:h-full pt-4 md:pt-0 pb-24 md:pb-0">
      {!embedded && <BackToOverview />}
      {!embedded && <SectionHeading>Work</SectionHeading>}
      <div className={`flex flex-col gap-10 ${embedded ? "" : "mt-4 md:mt-0"}`}>
        {experiences.map((item) => (
          <div key={item.id} className="flex flex-col border-l-2 border-white/10 pl-6 relative">
             <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-black border-2 border-white/50"></div>
             <h3 className="font-semibold text-lg text-white tracking-wide">{item.role}, {item.company_name}</h3>
             <span className="font-mono text-xs text-gray-500 mb-2 mt-1">{[item.employment_type, item.location, new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(item.started_on)) + " — " + (item.ended_on ? new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(item.ended_on)) : "Present")].filter(Boolean).join(" · ")}</span>
             <p className="font-light text-gray-400 text-sm leading-relaxed mt-2 text-justify">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
