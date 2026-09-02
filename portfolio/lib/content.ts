import { supabase } from "./supabase";

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "code"; language?: string; code: string }
  | { type: "image"; path: string; alt: string; caption?: string }
  | { type: "link"; url: string; label: string }
  | { type: "link_card"; url: string; title: string; description?: string }
  | { type: "tweet_header"; author_name: string; handle: string; text: string };

export type Post = {
  id: number;
  type: "blog" | "thought";
  title: string;
  slug: string | null;
  summary: string | null;
  content_blocks: ContentBlock[];
  cover_image_path: string | null;
  tags: string[];
  category: "build" | "read" | "think" | null;
  view_count: number;
  published_at: string | null;
  created_at: string;
};

export type PostPage = {
  posts: Post[];
  totalPages: number;
};

export type Project = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  technologies: string[];
  links: { type: string; label: string; url: string }[];
  status: "live" | "localhost_only" | "archived" | "in_progress";
  scope: "personal" | "company" | "freelance" | "experimental";
};

export type Experience = {
  id: number;
  company_name: string;
  role: string;
  employment_type: string | null;
  location: string | null;
  description: string;
  started_on: string;
  ended_on: string | null;
};

const fallbackPosts: Post[] = [
  {
    id: 1,
    type: "blog",
    title: "A small note on building dependable software",
    slug: "building-dependable-software",
    summary: "A first sample post for validating the portfolio content flow.",
    content_blocks: [
      { type: "paragraph", text: "A useful system does not need to be complicated. It needs to make the next decision clearer." },
      { type: "code", language: "ts", code: 'const principle = "keep the feedback loop short";' },
      { type: "link_card", url: "https://nextjs.org", title: "Next.js", description: "The framework used by this portfolio." },
    ],
    cover_image_path: null,
    tags: ["architecture", "craft"],
    category: null,
    view_count: 0,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    type: "thought",
    title: "Building for use, not display",
    slug: null,
    summary: "The small product decisions that remove friction tend to matter the most.",
    content_blocks: [{ type: "paragraph", text: "The best interface is often the one that lets someone finish their work without noticing the interface at all." }],
    cover_image_path: null,
    tags: ["product", "craft"],
    category: "think",
    view_count: 0,
    published_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
  },
];

const fallbackProjects: Project[] = [
  { id: 1, slug: "lumo-management-software", title: "LUMO — Management Software", summary: "SaaS management software built on a microservices and Onion Architecture foundation.", technologies: [".NET", "Microservices", "MariaDB", "Onion Architecture", "Razor UI"], links: [], status: "live", scope: "company" },
  { id: 2, slug: "ekici-web-automation", title: "Ekici Web Automation", summary: "An internal workflow automation product with a reusable UI system.", technologies: ["React", "Next.js", "System Design", "Automation"], links: [], status: "localhost_only", scope: "company" },
];

const fallbackExperiences: Experience[] = [
  { id: 1, company_name: "ithinkso", role: "Full Stack Developer", employment_type: "Full-time", location: "Istanbul", description: "Built a product end to end: database, architecture, patterns, deployment, and the operational details required to serve 1,000+ active users.", started_on: "2024-11-01", ended_on: null },
  { id: 2, company_name: "Mims Yazılım A.Ş.", role: "Full Stack Developer Intern", employment_type: "Internship", location: "Remote", description: "Worked with Next.js, SQL, Tailwind, and Prisma; co-authored an internal component library and contributed to an in-app window system.", started_on: "2023-02-01", ended_on: "2023-05-31" },
];

function parseBlocks(value: Json): ContentBlock[] {
  return Array.isArray(value) ? value.filter((block): block is ContentBlock => !!block && typeof block === "object" && "type" in block) : [];
}

export async function getPosts(type: Post["type"]) {
  if (!supabase) return fallbackPosts.filter((post) => post.type === type);
  const { data, error } = await supabase.from("posts").select("id,type,title,slug,summary,content_blocks,cover_image_path,tags,category,view_count,published_at,created_at").eq("type", type).eq("is_published", true).order("published_at", { ascending: false });
  if (error || !data) return fallbackPosts.filter((post) => post.type === type);
  return data.map((post) => ({ ...post, type: post.type as Post["type"], content_blocks: parseBlocks(post.content_blocks), tags: post.tags ?? [] })) as Post[];
}

export async function getPostsPage(type: Post["type"], page: number, pageSize = 10): Promise<PostPage> {
  const fallback = fallbackPosts.filter((post) => post.type === type);
  if (!supabase) {
    return { posts: fallback.slice((page - 1) * pageSize, page * pageSize), totalPages: Math.max(1, Math.ceil(fallback.length / pageSize)) };
  }

  const from = (page - 1) * pageSize;
  const { data, error, count } = await supabase
    .from("posts")
    .select("id,type,title,slug,summary,content_blocks,cover_image_path,tags,category,view_count,published_at,created_at", { count: "exact" })
    .eq("type", type)
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .order("id", { ascending: false })
    .range(from, from + pageSize - 1);

  if (error || !data) return { posts: fallback.slice(from, from + pageSize), totalPages: Math.max(1, Math.ceil(fallback.length / pageSize)) };
  return {
    posts: data.map((post) => ({ ...post, type: post.type as Post["type"], content_blocks: parseBlocks(post.content_blocks), tags: post.tags ?? [] })) as Post[],
    totalPages: Math.max(1, Math.ceil((count ?? 0) / pageSize)),
  };
}

export async function getProjects() {
  if (!supabase) return fallbackProjects;
  const { data, error } = await supabase.from("projects").select("id,slug,title,summary,technologies,links,status,scope").eq("is_published", true).order("sort_order");
  return error || !data ? fallbackProjects : (data as Project[]);
}

export async function getExperiences() {
  if (!supabase) return fallbackExperiences;
  const { data, error } = await supabase.from("experiences").select("id,company_name,role,employment_type,location,description,started_on,ended_on").eq("is_published", true).order("sort_order");
  return error || !data ? fallbackExperiences : (data as Experience[]);
}

export function estimateReadingMinutes(blocks: ContentBlock[]) {
  const text = blocks.map((block) => "text" in block ? block.text : "code" in block ? block.code : "").join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).filter(Boolean).length / 200));
}
