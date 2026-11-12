// Parses the plain-text module files in ./content into structured data.
const files = import.meta.glob("./content/m*.txt", { query: "?raw", import: "default", eager: true });

function parseBody(lines) {
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim();
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++;
      blocks.push({ type: "code", lang, text: code.join("\n") });
    } else if (line.startsWith("|")) {
      const rows = [];
      while (i < lines.length && lines[i].startsWith("|")) {
        rows.push(lines[i].split("|").slice(1, -1).map((c) => c.trim()));
        i++;
      }
      blocks.push({ type: "table", rows });
    } else if (line.startsWith("- ")) {
      const items = [];
      while (i < lines.length && lines[i].startsWith("- ")) items.push(lines[i++].slice(2));
      blocks.push({ type: "list", items });
    } else if (line.trim() === "") {
      i++;
    } else {
      blocks.push({ type: "p", text: line });
      i++;
    }
  }
  return blocks;
}

function parseModule(raw) {
  const lines = raw.split("\n");
  const title = lines[0].replace(/^#\s*/, "");
  const items = [];
  let cur = null;
  for (const line of lines.slice(1)) {
    const m = line.match(/^##\s+(\d+)\.\s+(.*)$/);
    if (m) {
      cur = { n: Number(m[1]), q: m[2], raw: [] };
      items.push(cur);
    } else if (cur) cur.raw.push(line);
  }
  const num = Number(title.match(/MODULE (\d+)/)[1]);
  return {
    id: num,
    title: title.replace(/^MODULE \d+\s*–\s*/, ""),
    items: items.map((it) => ({ n: it.n, q: it.q, blocks: parseBody(it.raw), module: num })),
  };
}

export const modules = Object.values(files)
  .map(parseModule)
  .sort((a, b) => a.id - b.id);

export const allItems = modules.flatMap((m) => m.items);
