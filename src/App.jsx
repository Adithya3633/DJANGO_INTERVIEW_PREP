import { useEffect, useState } from 'react'
import DjangoApp from './DjangoApp.jsx'
import ReactApp from './react-learning/ReactApp.jsx'
import FullstackApp from './fullstack-learning/FullstackApp.jsx'

const tracks = [
  {
    id: 'django',
    name: 'Django',
    description: 'Prepare for Django and Django REST Framework interviews.',
    details: '7 learning modules · quizzes · saved revision progress',
    icon: 'Dj',
    className: 'django-track',
  },
  {
    id: 'react',
    name: 'React',
    description: 'Practice React concepts, patterns, and interview questions.',
    details: '11 learning modules · flashcards · saved study progress',
    icon: 'Re',
    className: 'react-track',
  },
  {
    id: 'fullstack',
    name: 'Full-Stack Fundamentals',
    description: 'Learn how frontend, APIs, databases, authentication, and security work together.',
    details: '6 topic areas · 92 questions · saved progress',
    icon: 'FS',
    className: 'fullstack-track',
  },
]

export default function App() {
  const [track, setTrack] = useState(null)

  useEffect(() => {
    const selectedTrack = tracks.find((item) => item.id === track)
    document.title = selectedTrack ? `${selectedTrack.name} Interview Prep` : 'Interview Prep'
  }, [track])

  if (track) {
    return (
      <div className={track === 'fullstack' ? 'selected-track fullstack-selected-track' : 'selected-track'}>
        <div className="track-topbar">
          <button className="track-back-button" onClick={() => setTrack(null)}>
            ← All learning tracks
          </button>
        </div>
        {track === 'django' ? <DjangoApp /> : track === 'react' ? <ReactApp /> : <FullstackApp />}
      </div>
    )
  }

  return (
    <main className="track-picker">
      <div className="picker-content">
        <p className="picker-eyebrow">INTERVIEW PREP</p>
        <h1>Choose what you want to learn</h1>
        <p className="picker-intro">Pick a learning track to continue your interview preparation.</p>
        <div className="track-cards">
          {tracks.map((item) => (
            <button
              className={`track-card ${item.className}`}
              key={item.id}
              onClick={() => setTrack(item.id)}
            >
              <span className="track-icon" aria-hidden="true">{item.icon}</span>
              <span className="track-name">{item.name}</span>
              <span className="track-description">{item.description}</span>
              <span className="track-details">{item.details}</span>
              <span className="track-action">Start learning <span aria-hidden="true">→</span></span>
            </button>
          ))}
        </div>
      </div>
    </main>
  )
}
