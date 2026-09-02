import type { ContentBlock } from "@/lib/content";

export default function ContentBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-5 text-[0.95rem] leading-7 text-white/70">
      {blocks.map((block, index) => {
        if (block.type === "paragraph") return <p key={index}>{block.text}</p>;
        if (block.type === "code") return <pre key={index} className="overflow-x-auto border border-white/10 bg-black/20 p-4 text-xs leading-6 text-white/80"><code>{block.code}</code></pre>;
        if (block.type === "image") return <figure key={index}><img src={block.path} alt={block.alt} className="w-full border border-white/10" />{block.caption && <figcaption className="mt-2 text-xs text-white/45">{block.caption}</figcaption>}</figure>;
        if (block.type === "link_card") return <a key={index} href={block.url} target="_blank" rel="noreferrer" className="block border border-white/10 p-4 transition-colors hover:border-white/35"><p className="font-medium text-white">{block.title} <span aria-hidden="true">↗</span></p>{block.description && <p className="mt-1 text-sm text-white/55">{block.description}</p>}</a>;
        return <article key={index} className="border border-white/10 p-4"><p className="text-sm font-medium text-white">{block.author_name} <span className="text-white/45">{block.handle}</span></p><p className="mt-2 text-sm leading-6">{block.text}</p></article>;
      })}
    </div>
  );
}
