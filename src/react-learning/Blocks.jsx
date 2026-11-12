import { useState } from "react";

function Code({ lang, text }) {
  const [copied, setCopied] = useState(false);
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      /* clipboard unavailable */
    }
  }
  return (
    <div className="code">
      <div className="code-bar">
        <span>{lang || "text"}</span>
        <button onClick={copy}>{copied ? "Copied" : "Copy"}</button>
      </div>
      <pre>
        <code>{text}</code>
      </pre>
    </div>
  );
}

export default function Blocks({ blocks }) {
  return blocks.map((b, i) => {
    if (b.type === "p") return <p key={i}>{b.text}</p>;
    if (b.type === "list")
      return (
        <ul key={i}>
          {b.items.map((t, j) => (
            <li key={j}>{t}</li>
          ))}
        </ul>
      );
    if (b.type === "table")
      return (
        <div className="table-wrap" key={i}>
          <table>
            <thead>
              <tr>
                {b.rows[0].map((c, j) => (
                  <th key={j}>{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {b.rows.slice(1).map((r, j) => (
                <tr key={j}>
                  {r.map((c, k) => (
                    <td key={k}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    return <Code key={i} lang={b.lang} text={b.text} />;
  });
}
