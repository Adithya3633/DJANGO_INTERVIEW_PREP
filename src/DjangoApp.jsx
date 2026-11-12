import { useEffect, useMemo, useState } from 'react'
import { modules } from './modules'
import Markdown from './components/Markdown'
import Quiz from './components/Quiz'

const KEY = 'django-prep-progress'
const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || {}
  } catch {
    return {}
  }
}
const fromHash = () => location.hash.slice(1) || modules[0].id

export default function App() {
  const [done, setDone] = useState(load)
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [id, setId] = useState(fromHash)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(done))
    } catch {
      /* storage unavailable */
    }
  }, [done])

  useEffect(() => {
    const onHash = () => setId(fromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const idx = Math.max(0, modules.findIndex((m) => m.id === id))
  const mod = modules[idx]

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = `${mod.label}: ${mod.title}`
  }, [mod])

  const q = query.trim().toLowerCase()
  const shown = useMemo(
    () => (q ? modules.filter((m) => (m.title + ' ' + m.body).toLowerCase().includes(q)) : modules),
    [q]
  )
  const doneCount = modules.filter((m) => done[m.id]).length
  const go = (m) => {
    location.hash = m.id
    setOpen(false)
  }
  const prev = modules[idx - 1]
  const next = modules[idx + 1]

  return (
    <div className="layout">
      <button className="menu" onClick={() => setOpen(!open)} aria-expanded={open}>
        {open ? 'Close' : 'Modules'}
      </button>

      <aside className={open ? 'side open' : 'side'}>
        <h1>Django modules</h1>
        <p className="sub">A practical learning path</p>
        <div className="bar" role="progressbar" aria-valuenow={doneCount} aria-valuemax={modules.length}>
          <span style={{ width: `${(doneCount / modules.length) * 100}%` }} />
        </div>
        <p className="count">{doneCount} of {modules.length} modules revised</p>
        <input
          type="search"
          placeholder="Search all modules"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search all modules"
        />
        <nav>
          {shown.length === 0 && <p className="none">No module contains that text.</p>}
          {shown.map((m) => (
            <button key={m.id} className={m.id === mod.id ? 'nav active' : 'nav'} onClick={() => go(m)}>
              <span className={done[m.id] ? 'tick on' : 'tick'} aria-hidden="true">{done[m.id] ? '✓' : ''}</span>
              <span>
                <b>{m.label}</b>
                <small>{m.title}</small>
              </span>
            </button>
          ))}
        </nav>
      </aside>

      <main>
        <article>
          <Markdown source={mod.body} />
          {mod.quiz.length > 0 && <Quiz key={mod.id} items={mod.quiz} />}
          <div className="actions">
            <button
              className={done[mod.id] ? 'primary on' : 'primary'}
              onClick={() => setDone({ ...done, [mod.id]: !done[mod.id] })}
            >
              {done[mod.id] ? 'Revised (click to undo)' : 'Mark as revised'}
            </button>
            <div className="pager">
              {prev && <button onClick={() => go(prev)}>Back: {prev.label}</button>}
              {next && <button onClick={() => go(next)}>Next: {next.label}</button>}
            </div>
          </div>
        </article>
      </main>
    </div>
  )
}
