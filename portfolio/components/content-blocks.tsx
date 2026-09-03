import type { ContentBlock } from "@/lib/content";

export default function ContentBlocks({ blocks, highlightContribution = false }: { blocks: ContentBlock[]; highlightContribution?: boolean }) {
  return (
    <div className="space-y-5 text-[0.95rem] leading-7 text-white/70">
      {blocks.map((block, index) => {
        const previousBlock = blocks[index - 1];
        const nextBlock = blocks[index + 1];
        const isContribution = highlightContribution && block.type === "heading" && block.text.toLowerCase() === "my contribution" && nextBlock?.type === "paragraph";
        const contributionParagraphs: string[] = [];
        if (isContribution) {
          for (let paragraphIndex = index + 1; paragraphIndex < blocks.length; paragraphIndex += 1) {
            const paragraph = blocks[paragraphIndex];
            if (paragraph.type !== "paragraph") break;
            contributionParagraphs.push(paragraph.text);
          }
        }
        let contributionHeadingIndex = index - 1;
        while (contributionHeadingIndex >= 0 && blocks[contributionHeadingIndex].type === "paragraph") contributionHeadingIndex -= 1;
        const contributionHeading = blocks[contributionHeadingIndex];
        const followsContribution = highlightContribution && block.type === "paragraph" && contributionHeading?.type === "heading" && contributionHeading.text.toLowerCase() === "my contribution";

        if (isContribution) {
          return (
            <section key={index} className="project-contribution mt-10 px-5 py-5 sm:px-6 sm:py-6">
              <h2 className="text-base font-medium text-white">{block.text}</h2>
              <div className="mt-3 space-y-4">
                {contributionParagraphs.map((paragraph) => <p key={paragraph} className="text-[0.95rem] leading-7 text-white/70">{paragraph}</p>)}
              </div>
            </section>
          );
        }
        if (followsContribution) return null;
        if (block.type === "heading") return <h2 key={index} className="pt-5 text-base font-medium text-white">{block.text}</h2>;
        if (block.type === "paragraph") return <p key={index}>{block.text}</p>;
        if (block.type === "list") return <ul key={index} className="space-y-3">{block.items.map((item) => <li key={item} className="flex gap-3"><span aria-hidden="true" className="text-white/35">—</span><span>{item}</span></li>)}</ul>;
        if (block.type === "code") return <pre key={index} className="overflow-x-auto border border-white/10 bg-black/20 p-4 text-xs leading-6 text-white/80"><code className="block">{block.code.split("\n").map((line, lineIndex) => <span key={lineIndex} className={line.trimStart().startsWith("//") ? "code-comment block" : "code-line block"}>{line || "\u00a0"}</span>)}</code></pre>;
        if (block.type === "image") return <figure key={index}><img src={block.path} alt={block.alt} className="w-full border border-white/10" />{block.caption && <figcaption className="mt-2 text-xs text-white/45">{block.caption}</figcaption>}</figure>;
        if (block.type === "link") return <a key={index} href={block.url} target="_blank" rel="noreferrer" className="inline-block border-b border-current text-sm font-medium text-white transition-opacity hover:opacity-70">{block.label}</a>;
        if (block.type === "link_card") return <a key={index} href={block.url} target="_blank" rel="noreferrer" className="block border border-white/10 p-4 transition-colors hover:border-white/35"><p className="font-medium text-white">{block.title} <span aria-hidden="true">↗</span></p>{block.description && <p className="mt-1 text-sm text-white/55">{block.description}</p>}</a>;
        return <article key={index} className="border border-white/10 p-4"><p className="text-sm font-medium text-white">{block.author_name} <span className="text-white/45">{block.handle}</span></p><p className="mt-2 text-sm leading-6">{block.text}</p></article>;
      })}
    </div>
  );
}
