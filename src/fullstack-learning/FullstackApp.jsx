import { useEffect, useMemo, useState } from 'react'
import Markdown from '../components/Markdown.jsx'
import { allQuestions, sections } from './data.js'
import './fullstack-learning.css'

const PROGRESS_KEY = 'fullstack-fundamentals-progress-v1'

function loadProgress() {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY)) || {}
  } catch {
    return {}
  }
}

function QuestionCard({ question, learned, onToggle, open, onOpen, showSection }) {
  return (
    <article className={`fullstack-question${learned ? ' learned' : ''}`}>
      <button className="fullstack-question-head" onClick={onOpen} aria-expanded={open}>
        <span className="fullstack-question-number" aria-hidden="true">{learned ? '✓' : question.number}</span>
        <span className="fullstack-question-label">
          {showSection && <small>{question.sectionTitle}</small>}
          <strong>{question.title}</strong>
        </span>
        <span className="fullstack-chevron" aria-hidden="true">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="fullstack-answer">
          <QuestionContent question={question} />
          <button
            className={learned ? 'fullstack-learned-button on' : 'fullstack-learned-button'}
            onClick={onToggle}
          >
            {learned ? 'Marked as learned ✓' : 'Mark as learned'}
          </button>
        </div>
      )}
    </article>
  )
}

function Flowchart({ flowchart }) {
  return (
    <div
      className={`fullstack-flowchart ${flowchart.orientation}`}
      style={{ '--flow-count': flowchart.steps.length }}
      role="list"
      aria-label="Process flow"
    >
      {flowchart.steps.map((step, index) => (
        <div className="fullstack-flow-step" key={`${step.title}-${index}`} role="listitem">
          <span className="fullstack-flow-index">{String(index + 1).padStart(2, '0')}</span>
          <div>
            <strong>{step.title}</strong>
            {step.detail && <span>{step.detail}</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

function QuestionContent({ question }) {
  const parts = question.body.split(/(\{\{FULLSTACK_FLOW_\d+\}\})/g)
  return parts.map((part, index) => {
    const marker = /^\{\{FULLSTACK_FLOW_(\d+)\}\}$/.exec(part)
    if (marker) {
      const flowchart = question.flowcharts[Number(marker[1])]
      return flowchart ? <Flowchart key={index} flowchart={flowchart} /> : null
    }
    return part ? <Markdown key={index} source={part} /> : null
  })
}

export default function FullstackApp() {
  const [progress, setProgress] = useState(loadProgress)
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id)
  const [query, setQuery] = useState('')
  const [openQuestion, setOpenQuestion] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
    } catch {
      /* storage unavailable */
    }
  }, [progress])

  const activeSection = sections.find((section) => section.id === activeSectionId) || sections[0]
  const search = query.trim().toLowerCase()
  const questions = useMemo(() => {
    const pool = search
      ? allQuestions
      : activeSection.questions.map((question) => ({ ...question, sectionId: activeSection.id, sectionTitle: activeSection.title }))

    if (!search) return pool
    return pool.filter((question) => `${question.title} ${question.body}`.toLowerCase().includes(search))
  }, [activeSection, search])

  const learnedCount = allQuestions.filter((question) => progress[question.id]).length
  const sectionLearnedCount = (section) =>
    section.questions.filter((question) => progress[question.id]).length

  const toggleLearned = (id) => {
    setProgress((current) => {
      const next = { ...current }
      if (next[id]) delete next[id]
      else next[id] = true
      return next
    })
  }

  const chooseSection = (section) => {
    setActiveSectionId(section.id)
    setQuery('')
    setOpenQuestion(null)
    setMenuOpen(false)
  }

  const resetProgress = () => {
    if (window.confirm('Clear all saved full-stack progress?')) setProgress({})
  }

  return (
    <div id="fullstack-learning">
      <div className="fullstack-layout">
        <aside className={menuOpen ? 'fullstack-side open' : 'fullstack-side'}>
          <div className="fullstack-brand">
            <span className="fullstack-brand-icon" aria-hidden="true">FS</span>
            <div>
              <h1>Full-Stack Fundamentals</h1>
              <p>Interview learning path</p>
            </div>
          </div>
          <div className="fullstack-progress">
            <div className="fullstack-progress-heading">
              <span>Your progress</span>
              <strong>{Math.round((learnedCount / allQuestions.length) * 100)}%</strong>
            </div>
            <div className="fullstack-progress-track">
              <span style={{ width: `${(learnedCount / allQuestions.length) * 100}%` }} />
            </div>
            <small>{learnedCount} of {allQuestions.length} questions learned</small>
          </div>
          <p className="fullstack-nav-label">LEARNING PATH</p>
          <nav aria-label="Full-stack topics">
            {sections.map((section, index) => (
              <button
                key={section.id}
                className={section.id === activeSection.id && !search ? 'fullstack-section active' : 'fullstack-section'}
                onClick={() => chooseSection(section)}
              >
                <span className="fullstack-section-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="fullstack-section-text">
                  <strong>{section.title}</strong>
                  <small>{sectionLearnedCount(section)} / {section.questions.length} learned</small>
                </span>
              </button>
            ))}
          </nav>
          <button className="fullstack-reset" onClick={resetProgress}>Reset progress</button>
        </aside>

        <main className="fullstack-main">
          <header className="fullstack-header">
            <button
              className="fullstack-menu-button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-label="Toggle full-stack topics"
            >
              ☰
            </button>
            <div>
              <p className="fullstack-eyebrow">FULL-STACK FUNDAMENTALS</p>
              <h2>{search ? 'Search results' : activeSection.title}</h2>
              <small>
                {search ? `${questions.length} matching question${questions.length === 1 ? '' : 's'}` : `${activeSection.questions.length} interview questions`}
              </small>
            </div>
          </header>

          <label className="fullstack-search">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value)
                setOpenQuestion(null)
              }}
              placeholder="Search questions and answers"
              aria-label="Search full-stack questions and answers"
            />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search">×</button>}
          </label>

          {questions.length === 0 ? (
            <p className="fullstack-empty">No questions match your search. Try another term.</p>
          ) : (
            <div className="fullstack-question-list">
              {questions.map((question) => (
                <QuestionCard
                  key={question.id}
                  question={question}
                  learned={Boolean(progress[question.id])}
                  open={openQuestion === question.id}
                  showSection={Boolean(search)}
                  onOpen={() => setOpenQuestion((current) => current === question.id ? null : question.id)}
                  onToggle={() => toggleLearned(question.id)}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
