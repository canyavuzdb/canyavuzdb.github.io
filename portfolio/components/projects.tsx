"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./section-heading";
import { BackToOverview } from "./inline-navigation";
import ContentBlocks from "./content-blocks";
import { type Project } from "@/lib/content";
import { useProjects } from "@/lib/use-content";

const filters = ["all", "open_source", "private"] as const;
type ProjectFilter = typeof filters[number];

const filterLabels: Record<ProjectFilter, string> = {
  all: "all",
  open_source: "open source",
  private: "private work",
};

function formatMonth(value: string | null) {
  return value
    ? new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value))
    : null;
}

const projectCoverAdjustments: Record<string, { scale: number; position?: string }> = {
  "xperk-soentegre": { scale: 1.24, position: "50% 54%" },
  gatherly: { scale: 1.12, position: "50% 54%" },
  arespipe: { scale: 1.06, position: "50% 54%" },
  "interview-memory": { scale: 1.08, position: "50% 54%" },
};

function ProjectHeader({ project, detail = false }: { project: Project; detail?: boolean }) {
  if (project.cover_image_path) {
    const adjustment = projectCoverAdjustments[project.slug] ?? { scale: 1 };

    return (
      <div className="relative aspect-video w-full overflow-hidden bg-[#f3eee4]">
        <Image
          src={project.cover_image_path}
          alt={`${project.title} project cover`}
          fill
          sizes={detail ? "(min-width: 1024px) 928px, 100vw" : "(min-width: 640px) 520px, 100vw"}
          className="object-cover transition-transform duration-500"
          style={{ objectPosition: adjustment.position, transform: `scale(${adjustment.scale})` }}
        />
      </div>
    );
  }

  return (
    <div aria-label={`${project.title} visual placeholder`} className="relative aspect-video w-full overflow-hidden border-b border-white/10 bg-white/[0.035]">
      <div className="absolute inset-x-0 bottom-0 h-px bg-white/15" />
      <p className="absolute bottom-4 left-5 text-[0.62rem] font-mono uppercase tracking-[0.16em] text-white/25">Visual in progress</p>
    </div>
  );
}

function TechnicalProfile({ project }: { project: Project }) {
  const groups = project.technology_groups.length > 0
    ? project.technology_groups
    : project.technologies.length > 0
      ? [{ label: "Technologies", items: project.technologies }]
      : [];

  if (groups.length === 0) return null;

  return (
    <section aria-label="Technical profile" className="mt-12 border-y border-white/10 py-6 sm:py-7">
      <p className="font-mono text-[0.64rem] uppercase tracking-[0.16em] text-white/35">Technical profile</p>
      <div className="mt-6 grid gap-x-8 gap-y-6 sm:grid-cols-2">
        {groups.map((group) => (
          <div key={group.label} className="border-l border-white/15 pl-4">
            <p className="font-mono text-[0.62rem] uppercase tracking-[0.14em] text-white/35">{group.label}</p>
            <ul className="mt-3 space-y-1.5 text-sm leading-6 text-white/70">
              {group.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Projects({ embedded = false }: { embedded?: boolean }) {
  const projects = useProjects();
  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === "all" || project.visibility === filter),
    [filter, projects],
  );

  return (
    <section id="projects" className="w-full max-w-[58rem] scroll-mt-28">
      {!embedded && <BackToOverview />}
      {!embedded && <SectionHeading>Projects</SectionHeading>}

      <AnimatePresence mode="wait" initial={false}>
        {selectedProject ? (
          <motion.article
            key={selectedProject.id}
            initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className={embedded ? "" : "mt-7"}
          >
            <button type="button" onClick={() => setSelectedProject(null)} className="mb-7 border-b border-transparent text-sm text-white/45 transition-colors hover:border-current hover:text-white">
              ← all projects
            </button>
            <ProjectHeader project={selectedProject} detail />
            <div className="mt-9 max-w-[45rem]">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.68rem] font-mono uppercase tracking-[0.12em] text-white/35">
                <span>{selectedProject.visibility === "open_source" ? "open source" : "private work"}</span>
                {selectedProject.completed_on && <><span aria-hidden="true">·</span><time dateTime={selectedProject.completed_on}>{formatMonth(selectedProject.completed_on)}</time></>}
              </div>
              <h1 className="mt-4 text-2xl font-medium leading-tight text-white sm:text-3xl">{selectedProject.title}</h1>
              {selectedProject.role && <p className="mt-3 text-sm text-white/45">{selectedProject.role}{selectedProject.organization_name && ` · ${selectedProject.organization_name}`}</p>}
              <p className="mt-5 text-[0.98rem] leading-8 text-white/65">{selectedProject.summary}</p>
              {selectedProject.content_blocks.length > 0 && <div className="mt-9"><ContentBlocks blocks={selectedProject.content_blocks} highlightContribution /></div>}
              <TechnicalProfile project={selectedProject} />
            </div>
          </motion.article>
        ) : (
          <motion.div
            key="project-list"
            initial={{ opacity: 0, y: 10, filter: "blur(3px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(2px)" }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className={embedded ? "" : "mt-7"}
          >
            <p className="max-w-[38rem] text-sm leading-7 text-white/60">A selection of projects I have built, maintained, and learned from.</p>
            <nav aria-label="Filter projects" className="mt-7 flex items-center gap-5 text-xs text-white/40">
              {filters.map((item) => <button key={item} type="button" onClick={() => setFilter(item)} className={`border-b border-transparent pb-0.5 transition-colors hover:text-white ${filter === item ? "border-current text-white" : ""}`}>{filterLabels[item]}</button>)}
            </nav>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 8, filter: "blur(2px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -5, filter: "blur(2px)" }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {visibleProjects.length === 0 ? (
                  <p className="py-16 text-sm text-white/40">No {filterLabels[filter]} projects yet.</p>
                ) : (
                  <div className="mt-10 grid auto-rows-min grid-cols-1 items-start gap-6 sm:grid-cols-2">
                    {visibleProjects.map((project) => (
                      <button key={project.id} type="button" onClick={() => setSelectedProject(project)} className="group h-fit self-start overflow-hidden border border-white/10 text-left transition-colors hover:border-white/30">
                        <ProjectHeader project={project} />
                        <div className="p-5 sm:p-6">
                          <h3 className="text-lg font-medium text-white transition-opacity group-hover:opacity-70">{project.title}</h3>
                          <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/55">{project.summary}</p>
                          <div className="mt-7 flex items-center justify-between gap-4 text-[0.65rem] font-mono uppercase tracking-[0.1em] text-white/35">
                            <span>{project.visibility === "open_source" ? "open source" : "private work"}</span>
                            {formatMonth(project.completed_on) && <time dateTime={project.completed_on ?? undefined}>{formatMonth(project.completed_on)}</time>}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
