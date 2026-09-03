import { supabase } from "./supabase";

type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
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
  technology_groups: { label: string; items: string[] }[];
  links: { type: string; label: string; url: string }[];
  status: "live" | "localhost_only" | "archived" | "in_progress";
  scope: "personal" | "company" | "freelance" | "experimental";
  visibility: "open_source" | "private";
  cover_image_path: string | null;
  content_blocks: ContentBlock[];
  role: string | null;
  organization_name: string | null;
  started_on: string | null;
  completed_on: string | null;
};

export type Experience = {
  id: number;
  company_name: string;
  role: string;
  kind: "work" | "education";
  employment_type: string | null;
  location: string | null;
  description: string;
  highlights: string[];
  selected_work: { title: string; description: string }[];
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
  { id: 1, slug: "lumo-management-software", title: "LUMO — Sports & Facility Operations", summary: "A multi-tenant SaaS ecosystem for sports schools and facilities, connecting web and mobile experiences for members, tournament operations, payments, and day-to-day administration.", technologies: ["ASP.NET Core", "Entity Framework Core", "Razor UI", "React Native", "Relational DB", "Redis", "PayTR", "CI/CD", "Plesk"], technology_groups: [{ label: "Product model", items: ["Multi-tenant SaaS", "Modular monolith", "API-first platform"] }, { label: "Client applications", items: ["Razor UI web application", "Member mobile application", "React Native tournament application"] }, { label: "Backend", items: ["ASP.NET Core", "Entity Framework Core", "Relational DB", "Redis"] }, { label: "Security", items: ["JWT authentication", "Redis token blacklist"] }, { label: "Payments", items: ["Extensible payment integrations", "PayTR", "Idempotent payment callbacks"] }, { label: "Delivery", items: ["CI/CD", "Plesk"] }], links: [], status: "live", scope: "company", visibility: "private", cover_image_path: "/project-lumo-cover-v2.png", role: "Full-stack Software Engineer", organization_name: null, started_on: null, completed_on: null, content_blocks: [
    { type: "heading", text: "One connected platform" },
    { type: "paragraph", text: "LUMO is a multi-tenant SaaS platform used by more than 10,000 people across sports schools and facilities. It brings day-to-day operations into one shared system, connecting facilities, members, instructors, administrators, packages, reservations, payments, and tournaments through a consistent operational model." },
    { type: "heading", text: "What the platform manages" },
    { type: "list", items: ["Multi-facility operations, users, roles, and permissions.", "Lessons, reservations, attendance, tournaments, notifications, and reporting.", "Payments, manual and bulk collections, and instructor entitlement calculations.", "Role-specific experiences for administrators, instructors, students, and parents across web and mobile."] },
    { type: "heading", text: "Three connected client experiences" },
    { type: "paragraph", text: "The Razor UI web application supports day-to-day administration for parents, students, instructors, and facility teams. A member mobile application lets people manage their core processes and payments on the go. A dedicated React Native tournament application supports playing and managing tournament operations. All three clients use the same backend services, business rules, and operational data." },
    { type: "heading", text: "Flexible payment integrations" },
    { type: "paragraph", text: "The platform supports individual and bulk payment collection for education packages. Payments can be completed through the mobile experience, helping businesses move collection workflows beyond a dependence on physical POS devices. Its payment architecture is designed to introduce provider integrations quickly without redesigning the wider payment lifecycle." },
    { type: "paragraph", text: "PayTR is currently integrated. Provider-facing payment state remains separate from business payment records, and idempotent callback processing prevents repeated external requests from applying the same payment operation more than once." },
    { type: "heading", text: "My contribution" },
    { type: "paragraph", text: "I worked across the platform’s technical foundation: multi-tenant data modelling, API design, role and claim-based authorization, and the business rules that connect facilities, members, instructors, packages, reservations, attendance, payments, and tournament operations." },
    { type: "paragraph", text: "My work also extended beyond implementation. I joined customer meetings to understand operational problems, translated those needs into new product capabilities, and stayed in direct contact with people using the platform to provide live support and resolve issues as they emerged." },
    { type: "paragraph", text: "I contributed to the platform’s client experiences as well: building web interfaces with Razor UI and developing the tournament mobile application with React Native, including its delivery to mobile platforms. Both applications consume the same backend services and operate against the same business rules and operational data." },
    { type: "paragraph", text: "I also took part in introducing LUMO to new facilities, explaining the product, supporting onboarding and setup, and continuing that relationship after launch. On the backend and operations side, I worked with JWT authentication, Redis-backed token blacklist operations, extensible payment integrations, idempotent callback handling, CI/CD, Plesk deployments, monitoring, and production support." },
  ] },
  { id: 3, slug: "arespipe", title: "AresPipe — Industrial Production Operations", summary: "An industrial SaaS platform for shipyard and pipe-manufacturing operations, connecting production planning, field execution, quality processes, and operational visibility across web and mobile.", technologies: ["Industrial SaaS", "Modular monolith", "JWT authentication", "CSRF protection", "Role-based authorization", "API design", "Web operations interface", "Mobile field experience", "QR-assisted lookup"], technology_groups: [{ label: "Product model", items: ["Industrial SaaS", "Modular monolith", "Role-aware workflows"] }, { label: "Operational domains", items: ["Production tracking", "Spool and pipeline workflows", "Work orders", "Quality", "Field operations"] }, { label: "Security", items: ["JWT authentication", "CSRF protection", "Role-based authorization"] }, { label: "Interfaces", items: ["Web operations interface", "Mobile field experience", "QR-assisted lookup"] }, { label: "Engineering", items: ["API design", "User-specific pages", "Customer-driven workflow design"] }], links: [], status: "live", scope: "company", visibility: "private", cover_image_path: "/project-arespipe-cover-v2.png", role: "Full-stack Software Engineer", organization_name: null, started_on: null, completed_on: null, content_blocks: [
    { type: "heading", text: "One operational system" },
    { type: "paragraph", text: "AresPipe brings project, spool, pipeline, work-order, production, quality, delivery, document, and personnel workflows into one operational system. It gives office teams and field users a shared, current view of work in progress rather than relying on disconnected handoffs." },
    { type: "heading", text: "Designed around how work moves" },
    { type: "paragraph", text: "The product is shaped around real production inputs and outputs: what needs to be produced, where it is in the process, who is responsible, what has been completed, and what needs attention next. QR-based access makes spool and production information quickly available on the field." },
    { type: "heading", text: "A modular platform" },
    { type: "paragraph", text: "The platform follows a modular-monolith approach. It keeps related operational domains within one deployable system while preserving clear boundaries between workflows, APIs, authorization, and user-facing surfaces. This made it possible to evolve the product without turning operational rules into scattered, page-specific logic." },
    { type: "heading", text: "Role-aware experiences" },
    { type: "paragraph", text: "Different users need different operational views. I designed user-based pages and navigation flows so that production, quality, management, and field users could reach the actions and information relevant to their role without exposing unrelated workflows." },
    { type: "heading", text: "My contribution" },
    { type: "paragraph", text: "I helped establish the project architecture and its modular structure, including API design and the way user-facing pages map to operational domains. I worked from customer requirements to concrete inputs, outputs, workflows, and page behaviour—turning production needs into usable software rather than generic administration screens." },
    { type: "paragraph", text: "I designed role-based access and navigation flows using JWT authentication and CSRF protection, with attention to secure transitions between pages and the permissions behind each action. I also worked across the API and client-facing layers to keep the system’s rules, data contracts, and user experience aligned." },
  ] },
  { id: 2, slug: "xperk-soentegre", title: "Xperk & SoEntegre", summary: "A SaaS ecosystem for commerce and marketplace operations, connecting live inventory, orders, fulfilment, and customer purchases through one shared system.", technologies: [".NET", "Relational DB", "PHP", "PayTR", "GitLab CI/CD", "Plesk"], technology_groups: [{ label: "Product model", items: ["SaaS", "Multi-channel commerce", "Modular monolith"] }, { label: "Application", items: [".NET backend", "PHP storefront", "Relational DB"] }, { label: "Integrations", items: ["5+ marketplaces", "PayTR"] }, { label: "Delivery", items: ["GitLab CI/CD", "Plesk", "Self-managed servers"] }], links: [], status: "live", scope: "company", visibility: "private", cover_image_path: "/project-xperk-cover-v2.png", role: "Full-stack Software Engineer", organization_name: null, started_on: null, completed_on: null, content_blocks: [
    { type: "heading", text: "One connected system" },
    { type: "paragraph", text: "Xperk and SoEntegre were built as two connected surfaces of the same commerce ecosystem. SoEntegre provides the operational control layer for merchants, while Xperk turns the same catalogue, stock, and order data into a customer-facing shopping experience." },
    { type: "paragraph", text: "The goal was not simply to build an admin panel and a storefront separately, but to keep operational decisions and customer purchases connected through a shared system." },
    { type: "heading", text: "SoEntegre — the operations layer" },
    { type: "paragraph", text: "SoEntegre centralizes multi-channel commerce operations in one place. Merchants can connect more than five marketplaces and manage a catalogue of more than 2,000 products without maintaining separate workflows for each channel." },
    { type: "list", items: ["Product, brand, category, and catalogue management.", "Marketplace integrations and channel-specific product operations.", "Stock monitoring, inventory updates, order management, and fulfilment workflows.", "Customer records, marketplace message handling, reporting, dashboards, and role-based administration."] },
    { type: "paragraph", text: "A shared data model translates marketplace-specific data and processes into a consistent internal workflow, giving teams a clearer view of catalogue health, stock movement, order activity, and customer operations across channels." },
    { type: "heading", text: "Xperk — the customer-facing commerce experience" },
    { type: "paragraph", text: "Xperk is the customer-facing storefront connected to the same commerce operations layer. It uses the product, customer, and inventory data managed through SoEntegre to support a dependable purchasing experience." },
    { type: "list", items: ["Product discovery, listing, and detail pages.", "Intelligent categorization to help customers find relevant products.", "Current stock information delivered from the backend.", "Cart, checkout, order and shipment tracking, and customer purchase history."] },
    { type: "paragraph", text: "This connection means that stock and product updates made through the operational system can be reflected in the shopping experience without maintaining disconnected catalogues." },
    { type: "heading", text: "Payments and consistency" },
    { type: "paragraph", text: "The PHP storefront consumes APIs provided by the .NET backend and uses PayTR for payment processing. Payment handling was treated as a reliability problem: callbacks are processed with idempotent behaviour so repeated requests cannot create duplicate business operations, and payment, order, and inventory states remain aligned." },
    { type: "heading", text: "Architecture and delivery" },
    { type: "paragraph", text: "The ecosystem was built around a modular-monolith SaaS architecture with a .NET backend and relational database. I also worked on GitLab CI/CD pipelines, deployment through Plesk on self-managed servers, and the production processes needed to operate and monitor the system reliably." },
    { type: "heading", text: "My contribution" },
    { type: "paragraph", text: "I contributed end to end across initial database design, backend APIs, business rules, marketplace and storefront data flows, payment integration, deployment, and production support. The central challenge was turning a complex set of marketplace and commerce processes into one dependable system." },
  ] },
  { id: 4, slug: "gatherly", title: "Gatherly", summary: "A calendar-first local-events platform for discovering, creating, and managing community plans, with consistent capacity and attendance workflows.", technologies: ["Next.js 16", "React 19", "TypeScript", "NestJS 11", "TypeORM", "PostgreSQL 16", "RabbitMQ", "Socket.IO", "MapLibre GL", "Docker Compose"], technology_groups: [{ label: "Product", items: ["Local events platform", "Calendar-first experience", "Public, unlisted, and private plans"] }, { label: "Web", items: ["Next.js 16", "React 19", "TypeScript", "MapLibre GL"] }, { label: "API and data", items: ["NestJS 11", "TypeORM", "PostgreSQL 16", "Swagger/OpenAPI"] }, { label: "Realtime", items: ["RabbitMQ", "Socket.IO"] }, { label: "Authentication", items: ["JWT access token", "Rotating refresh-session cookie"] }, { label: "Local development", items: ["Docker Compose", "Mailpit", "pnpm 11"] }], links: [], status: "localhost_only", scope: "personal", visibility: "open_source", cover_image_path: "/project-gatherly-cover-v2.png", role: null, organization_name: null, started_on: null, completed_on: null, content_blocks: [
    { type: "heading", text: "Community plans, without the noise" },
    { type: "paragraph", text: "Gatherly is a local-events platform for finding, creating, and managing community plans. It pairs a quiet, calendar-first web experience with the operational rules needed for plans to stay dependable when several people act at once." },
    { type: "heading", text: "What it supports" },
    { type: "list", items: ["Public discovery and personal calendar views across all 81 Turkish cities.", "Public, unlisted, and private events with open, approval-required, and invite-only participation.", "RSVPs, capacity accounting, waitlist promotion, invitations, notifications, cancellations, and organizer handover.", "Map-based point selection, optional routes, route summaries, and protected event-detail data."] },
    { type: "heading", text: "Consistency as a product feature" },
    { type: "paragraph", text: "Attendance and capacity decisions happen inside PostgreSQL transactions. Messaging begins after a successful commit, while realtime signals ask clients to re-fetch the current authorized state. This avoids contradictory outcomes around final-seat RSVPs, invitation acceptance, and waitlist promotion." },
    { type: "heading", text: "Architecture" },
    { type: "paragraph", text: "The web application uses Next.js and React. A NestJS modular monolith owns API and domain boundaries, backed by PostgreSQL. RabbitMQ and Socket.IO support notifications and realtime updates, while map and routing integrations remain optional local services." },
    { type: "heading", text: "Current scope" },
    { type: "paragraph", text: "Gatherly is an open-source local product build rather than a hosted public service. The repository includes the full web application, API, Docker Compose setup, API reference, migrations, tests, and architecture documentation." },
    { type: "link", label: "View Gatherly on GitHub", url: "https://github.com/canyavuzdb/Gatherly" },
  ] },
  { id: 5, slug: "interview-memory", title: "Interview Memory", summary: "An open-source platform that turns anonymous candidate experiences into shared insight on hiring processes and company practices.", technologies: ["Next.js", "React", "Tailwind CSS", "Supabase", "Vitest", "TypeScript"], technology_groups: [{ label: "Product", items: ["Candidate experience research", "Anonymous surveys", "Hiring benchmarks"] }, { label: "Application", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] }, { label: "Platform", items: ["Supabase", "Local development environment"] }, { label: "Quality", items: ["Vitest", "Linting", "Type checking", "Coverage", "Production build"] }, { label: "Experience", items: ["Turkish and English", "Responsive design", "Light and dark themes"] }], links: [], status: "in_progress", scope: "personal", visibility: "open_source", cover_image_path: "/project-interview-memory-cover-v2.png", role: null, organization_name: null, started_on: null, completed_on: null, content_blocks: [
    { type: "heading", text: "Hiring experiences as shared insight" },
    { type: "paragraph", text: "Interview Memory is an open-source platform for turning personal application and interview experiences into shared insight. Candidates can contribute anonymously, compare their own process with similar candidate groups, and examine company hiring practices through aggregated data." },
    { type: "heading", text: "What it explores" },
    { type: "list", items: ["Anonymous survey flows for application and company experiences.", "Role- and company-based hiring benchmarks.", "Application activity and company-response reporting.", "A responsive bilingual interface with light and dark themes."] },
    { type: "heading", text: "Designed for privacy-aware reporting" },
    { type: "paragraph", text: "The product is built around the tension between useful benchmark data and the privacy of people contributing it. The current interface and reporting experience make the intended product visible without presenting placeholder benchmark values as production data." },
    { type: "heading", text: "Current scope" },
    { type: "paragraph", text: "Interview Memory is in active development. The interface and reporting experience are usable today; production authentication, authorization, and the full database layer are being introduced incrementally through a local Supabase workflow." },
    { type: "heading", text: "Engineering foundation" },
    { type: "paragraph", text: "The project uses Next.js, React, TypeScript, Tailwind CSS, Supabase, and Vitest. Its quality workflow combines linting, type checking, tests, coverage, and a production build in one check command." },
    { type: "link", label: "View Interview Memory on GitHub", url: "https://github.com/canyavuzdb/interview-memory" },
  ] },
];

const projectCoverPaths: Record<string, string> = {
  lumo: "/project-lumo-cover-v2.png",
  arespipe: "/project-arespipe-cover-v2.png",
  xperk: "/project-xperk-cover-v2.png",
  gatherly: "/project-gatherly-cover-v2.png",
  "interview-memory": "/project-interview-memory-cover-v2.png",
};

function resolveProjectCover(project: { slug: string; title: string; cover_image_path?: string | null }) {
  if (project.cover_image_path) return project.cover_image_path;
  const normalized = `${project.slug} ${project.title}`.toLowerCase();
  return Object.entries(projectCoverPaths).find(([key]) => normalized.includes(key))?.[1] ?? null;
}

const fallbackExperiences: Experience[] = [
  { id: 1, company_name: "ithinkso", role: "Full Stack Developer", kind: "work", employment_type: "Full-time", location: "Çanakkale", description: "At ithinkso, I take end-to-end ownership of product development: from the first system design decisions and database schemas to delivery, deployment, monitoring, and ongoing operations. I work on products that have grown to serve 10,000+ users, with a focus on reliable flows, maintainable architecture, and the operational details that keep software dependable after launch.", highlights: ["Designed system foundations, database schemas, and product workflows from the ground up.", "Built and evolved applications across the full lifecycle, from implementation to production release.", "Deployed and operated products through Plesk, including monitoring, logging, and production troubleshooting.", "Helped keep critical user flows reliable as products scaled to larger user bases.", "Took technical ownership across architecture, delivery, and live operational needs."], selected_work: [], started_on: "2024-11-01", ended_on: null },
  { id: 2, company_name: "Mims Yazılım A.Ş.", role: "Full Stack Developer Intern", kind: "work", employment_type: "Internship", location: "Remote", description: "At Mims Yazılım, I contributed to an internal software platform built as a Next.js monolith. My work focused on the relationship between role-based access control and the interface: ensuring that each user could see, access, and act on only the parts of the product appropriate to their role.", highlights: ["Built the in-application roles and permissions experience for an internal software system.", "Implemented role-based page visibility and access restrictions in a Next.js monolith.", "Helped translate authorization rules into clear, predictable product behavior for users.", "Worked with Next.js, SQL, Tailwind CSS, and Prisma.", "Contributed to the internal component system, in-app window management, and form validation work."], selected_work: [], started_on: "2023-02-01", ended_on: "2023-05-31" },
  { id: 3, company_name: "Secube Teknoloji AR-GE A.Ş.", role: "Full Stack Developer Intern", kind: "work", employment_type: "Internship", location: "Istanbul", description: "At Secube, I worked on enterprise desktop software and digital archiving workflows. The work combined WPF-based applications, MailMerge processes, local-server deployments, and the challenge of presenting digitized documents accurately and usefully to the right users.", highlights: ["Contributed to MailMerge workflows and WPF-based enterprise desktop applications.", "Worked on applications deployed to local servers for operational use.", "Supported digital document archiving processes and the software that presents archived records to users.", "Gained practical experience with .NET, SQL, WPF, DevExpress, deployment, and enterprise delivery workflows.", "Worked with software shaped by real operational needs rather than isolated technical exercises."], selected_work: [], started_on: "2022-05-01", ended_on: "2022-09-01" },
  { id: 4, company_name: "National Technical University Kharkiv Polytechnic Institute", role: "Computer Science — Software Engineering", kind: "education", employment_type: null, location: "Kharkiv", description: "My university years established the foundations of how I approach software: through team collaboration, practical delivery, and the connection between technical decisions and a working product.", highlights: [], selected_work: [{ title: "10-Level C++ Game · Five-person team", description: "Built a ten-level game entirely in C++ with a five-person team. We produced the game assets ourselves and implemented the physics engine in-house. It was my first meaningful experience of collaborative software development: dividing work, making shared technical decisions, and bringing separate contributions together into one playable product." }, { title: "Real-time Team Messaging Application · Five-person team", description: "Designed and deployed a real-time Slack-style messaging application as a five-person team. The project gave us experience in building a shared product from planning through deployment, while working around real-time communication, collaboration, and team coordination." }, { title: "Smart Irrigation Monitoring & Automation System · Graduation Project", description: "Designed a smart irrigation system that automates plant care through sensor-driven decisions and continuous monitoring. The system measures each plant's current condition and needs, can activate or deactivate irrigation remotely from smart devices, and makes the resulting data visible to users at all times. Its reporting layer turns live readings into daily, weekly, monthly, and yearly views, helping users understand both immediate conditions and longer-term patterns." }], started_on: "2019-09-01", ended_on: "2023-07-01" },
];

function parseBlocks(value: Json): ContentBlock[] {
  return Array.isArray(value) ? value.filter((block): block is ContentBlock => !!block && typeof block === "object" && "type" in block) : [];
}

function parseTechnologyGroups(value: Json): Project["technology_groups"] {
  return Array.isArray(value)
    ? value.filter((group): group is Project["technology_groups"][number] => !!group && typeof group === "object" && "label" in group && "items" in group && typeof group.label === "string" && Array.isArray(group.items) && group.items.every((item) => typeof item === "string"))
    : [];
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
  const { data, error } = await supabase.from("projects").select("*").eq("is_published", true).order("sort_order");
  return error || !data ? fallbackProjects : data.map((project) => ({
    ...project,
    visibility: project.visibility === "open_source" ? "open_source" : "private",
    cover_image_path: resolveProjectCover(project),
    content_blocks: parseBlocks(project.content_blocks),
    links: project.links ?? [],
    technologies: project.technologies ?? [],
    technology_groups: parseTechnologyGroups(project.technology_groups),
    role: project.role ?? null,
    organization_name: project.organization_name ?? null,
    started_on: project.started_on ?? null,
    completed_on: project.completed_on ?? null,
  })) as Project[];
}

export async function getExperiences() {
  if (!supabase) return fallbackExperiences;
  const { data, error } = await supabase.from("experiences").select("id,company_name,role,kind,employment_type,location,description,highlights,selected_work,started_on,ended_on").eq("is_published", true).order("sort_order");
  return error || !data ? fallbackExperiences : (data as Experience[]);
}

export function estimateReadingMinutes(blocks: ContentBlock[]) {
  const text = blocks.map((block) => "text" in block ? block.text : "code" in block ? block.code : "").join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/).filter(Boolean).length / 200));
}
