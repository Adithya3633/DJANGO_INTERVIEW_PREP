import { useEffect, useMemo, useState } from "react";
import { modules, allItems } from "./data.js";
import Blocks from "./Blocks.jsx";
import "./react-learning.css";

const KEY = "react-lab-progress-v1";

function useProgress() {
  const [p, setP] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
    } catch {
      /* storage unavailable */
    }
  }, [p]);
  // status: "learned" | "review" | undefined
  const set = (n, status) =>
    setP((old) => {
      const next = { ...old };
      if (!status || old[n] === status) delete next[n];
      else next[n] = status;
      return next;
    });
  return [p, set, () => setP({})];
}

function Card({ item, status, onStatus, open, onToggle }) {
  return (
    <article className={`card ${status || ""}`} id={`q${item.n}`}>
      <button className="card-head" onClick={onToggle} aria-expanded={open}>
        <span className="qnum">{item.n}</span>
        <span className="qtext">{item.q}</span>
        <span className="chev">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="card-body">
          <Blocks blocks={item.blocks} />
          <div className="actions">
            <button className={status === "learned" ? "on good" : ""} onClick={() => onStatus(item.n, "learned")}>
              {status === "learned" ? "Learned ✓" : "Mark learned"}
            </button>
            <button className={status === "review" ? "on warn" : ""} onClick={() => onStatus(item.n, "review")}>
              {status === "review" ? "Flagged for review" : "Review later"}
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

function Study({ pool, progress, setStatus }) {
  const [openSet, setOpenSet] = useState(new Set());
  const toggle = (n) =>
    setOpenSet((s) => {
      const x = new Set(s);
      x.has(n) ? x.delete(n) : x.add(n);
      return x;
    });
  return (
    <>
      <div className="toolbar">
        <button onClick={() => setOpenSet(new Set(pool.map((i) => i.n)))}>Expand all</button>
        <button onClick={() => setOpenSet(new Set())}>Collapse all</button>
      </div>
      {pool.length === 0 && <p className="empty">No questions match. Try a different search or filter.</p>}
      {pool.map((it) => (
        <Card key={it.n} item={it} status={progress[it.n]} onStatus={setStatus} open={openSet.has(it.n)} onToggle={() => toggle(it.n)} />
      ))}
    </>
  );
}

function shuffle(a) {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [x[i], x[j]] = [x[j], x[i]];
  }
  return x;
}

function Flashcards({ pool, progress, setStatus }) {
  const [deck, setDeck] = useState(pool);
  const [idx, setIdx] = useState(0);
  const [show, setShow] = useState(false);
  useEffect(() => {
    setDeck(pool);
    setIdx(0);
    setShow(false);
  }, [pool]);

  if (deck.length === 0) return <p className="empty">Nothing to practise here yet.</p>;
  const item = deck[Math.min(idx, deck.length - 1)];
  const go = (d) => {
    setShow(false);
    setIdx((i) => (i + d + deck.length) % deck.length);
  };
  const rate = (status) => {
    setStatus(item.n, status, true);
    go(1);
  };
  return (
    <div className="flash">
      <div className="flash-meta">
        <span>
          Card {idx + 1} of {deck.length}
        </span>
        <button onClick={() => { setDeck(shuffle(deck)); setIdx(0); setShow(false); }}>Shuffle</button>
      </div>
      <div className="flash-card">
        <p className="flash-q">{item.q}</p>
        {!show ? (
          <button className="primary" onClick={() => setShow(true)}>
            Show answer
          </button>
        ) : (
          <div className="flash-a">
            <Blocks blocks={item.blocks} />
          </div>
        )}
      </div>
      {show && (
        <div className="actions">
          <button className="good on" onClick={() => rate("learned")}>I knew it</button>
          <button className="warn on" onClick={() => rate("review")}>Need review</button>
        </div>
      )}
      <div className="nav">
        <button onClick={() => go(-1)}>Previous</button>
        <button onClick={() => go(1)}>Next</button>
      </div>
      <p className="hint">Try answering out loud first, then reveal. Rated cards are saved to your progress.</p>
    </div>
  );
}

export default function ReactApp() {
  const [progress, setProgress, resetAll] = useProgress();
  const [mode, setMode] = useState("study");
  const [mod, setMod] = useState(1);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [menu, setMenu] = useState(false);

  const setStatus = (n, status, force) => setProgress(n, force ? status : status);
  const learned = Object.values(progress).filter((v) => v === "learned").length;
  const pct = Math.round((learned / allItems.length) * 100);

  const current = mod === 0 ? { title: "All modules", items: allItems } : modules.find((m) => m.id === mod);

  const pool = useMemo(() => {
    const q = query.trim().toLowerCase();
    return current.items.filter((it) => {
      if (filter === "learned" && progress[it.n] !== "learned") return false;
      if (filter === "review" && progress[it.n] !== "review") return false;
      if (filter === "todo" && progress[it.n]) return false;
      if (!q) return true;
      const hay = (it.q + " " + it.blocks.map((b) => b.text || b.items?.join(" ") || b.rows?.flat().join(" ")).join(" ")).toLowerCase();
      return hay.includes(q);
    });
  }, [current, filter, query, progress]);

  const modProgress = (m) => m.items.filter((i) => progress[i.n] === "learned").length;

  return (
    <div id="react-learning">
      <div className="layout">
      <aside className={menu ? "side open" : "side"}>
        <h1>React Interview Lab</h1>
        <div className="overall">
          <div className="bar"><div style={{ width: pct + "%" }} /></div>
          <small>{learned} of {allItems.length} learned ({pct}%)</small>
        </div>
        <nav>
          <button className={mod === 0 ? "mod active" : "mod"} onClick={() => { setMod(0); setMenu(false); }}>
            <span>All modules</span>
            <em>{allItems.length}</em>
          </button>
          {modules.map((m) => (
            <button key={m.id} className={mod === m.id ? "mod active" : "mod"} onClick={() => { setMod(m.id); setMenu(false); }}>
              <span>{m.id}. {m.title}</span>
              <em>{modProgress(m)}/{m.items.length}</em>
            </button>
          ))}
        </nav>
        <button className="reset" onClick={() => window.confirm("Clear all saved progress?") && resetAll()}>
          Reset progress
        </button>
      </aside>

      <main>
        <header>
          <button className="burger" onClick={() => setMenu(!menu)} aria-label="Toggle modules">☰</button>
          <div>
            <h2>{current.title}</h2>
            <small>{pool.length} question{pool.length === 1 ? "" : "s"} shown</small>
          </div>
        </header>

        <div className="controls">
          <div className="tabs" role="tablist">
            <button role="tab" aria-selected={mode === "study"} className={mode === "study" ? "tab on" : "tab"} onClick={() => setMode("study")}>Study</button>
            <button role="tab" aria-selected={mode === "flash"} className={mode === "flash" ? "tab on" : "tab"} onClick={() => setMode("flash")}>Flashcards</button>
          </div>
          <input type="search" placeholder="Search questions and answers" value={query} onChange={(e) => setQuery(e.target.value)} />
          <select value={filter} onChange={(e) => setFilter(e.target.value)} aria-label="Filter by status">
            <option value="all">All</option>
            <option value="todo">Not started</option>
            <option value="review">Review later</option>
            <option value="learned">Learned</option>
          </select>
        </div>

        {mode === "study" ? (
          <Study key={mod + filter + query} pool={pool} progress={progress} setStatus={setStatus} />
        ) : (
          <Flashcards pool={pool} progress={progress} setStatus={setStatus} />
        )}
      </main>
      </div>
    </div>
  );
}
