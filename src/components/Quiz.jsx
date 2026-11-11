import { useState } from 'react'

export default function Quiz({ items }) {
  const [picked, setPicked] = useState({})
  return (
    <section className="quiz">
      <h2>Quick check</h2>
      {items.map((it, qi) => (
        <div key={qi} className="quiz-q">
          <p>{it.q}</p>
          <ul>
            {it.options.map((o, oi) => {
              const p = picked[qi]
              let cls = ''
              if (p !== undefined) cls = oi === it.answer ? 'right' : oi === p ? 'wrong' : ''
              return (
                <li key={oi}>
                  <button
                    className={cls}
                    disabled={p !== undefined}
                    onClick={() => setPicked({ ...picked, [qi]: oi })}
                  >
                    {o}
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </section>
  )
}
