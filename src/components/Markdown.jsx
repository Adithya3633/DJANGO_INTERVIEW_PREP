import { useState } from 'react'

const unescapePipes = (s) => s.replace(/\\\|/g, '|')

function inline(text) {
  const out = []
  const re = /(\[[^\]]+\]\(#[^)]+\)|`[^`]+`|\*\*[^*]+\*\*)/g
  let last = 0
  let m
  let i = 0
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(unescapePipes(text.slice(last, m.index)))
    const tok = m[0]
    const link = /^\[([^\]]+)\]\((#[^)]+)\)$/.exec(tok)
    if (link) {
      out.push(<a key={i++} href={link[2]}>{link[1]}</a>)
    } else {
      out.push(
        tok[0] === '`'
          ? <code key={i++}>{unescapePipes(tok.slice(1, -1))}</code>
          : <strong key={i++}>{unescapePipes(tok.slice(2, -2))}</strong>
      )
    }
    last = m.index + tok.length
  }
  if (last < text.length) out.push(unescapePipes(text.slice(last)))
  return out
}

function CodeBlock({ lang, code }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }
  return (
    <div className="code">
      <div className="code-bar">
        <span>{lang || 'text'}</span>
        <button onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
      </div>
      <pre><code>{code}</code></pre>
    </div>
  )
}

const splitRow = (r) =>
  r.trim().replace(/^\|/, '').replace(/(?<!\\)\|$/, '').split(/(?<!\\)\|/).map((c) => c.trim())

const isBlockStart = (l) =>
  l.trim() === '' || /^(```|#{1,3} |\||- |\d+\. |>)/.test(l)

const headingId = (text) =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

export default function Markdown({ source }) {
  const lines = source.split('\n')
  const out = []
  let i = 0
  let k = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      const buf = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) buf.push(lines[i++])
      i++
      out.push(<CodeBlock key={k++} lang={lang} code={buf.join('\n')} />)
      continue
    }

    const h = /^(#{1,3}) (.*)/.exec(line)
    if (h) {
      const Tag = 'h' + h[1].length
      out.push(<Tag key={k++} id={headingId(h[2])}>{inline(h[2])}</Tag>)
      i++
      continue
    }

    if (line.startsWith('|')) {
      const rows = []
      while (i < lines.length && lines[i].startsWith('|')) rows.push(lines[i++])
      const head = splitRow(rows[0])
      const body = rows.slice(2).map(splitRow)
      out.push(
        <div className="table-wrap" key={k++}>
          <table>
            <thead><tr>{head.map((c, j) => <th key={j}>{inline(c)}</th>)}</tr></thead>
            <tbody>
              {body.map((r, ri) => (
                <tr key={ri}>{r.map((c, j) => <td key={j}>{inline(c)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    if (/^(- |\d+\. )/.test(line)) {
      const ordered = /^\d+\. /.test(line)
      const items = []
      while (i < lines.length && /^(- |\d+\. )/.test(lines[i])) {
        items.push(lines[i].replace(/^(- |\d+\. )/, ''))
        i++
      }
      const Tag = ordered ? 'ol' : 'ul'
      out.push(<Tag key={k++}>{items.map((t, j) => <li key={j}>{inline(t)}</li>)}</Tag>)
      continue
    }

    if (line.startsWith('>')) {
      const buf = []
      while (i < lines.length && lines[i].startsWith('>')) buf.push(lines[i++].replace(/^>\s?/, ''))
      out.push(<blockquote key={k++}>{inline(buf.join(' '))}</blockquote>)
      continue
    }

    if (line.trim() === '') {
      i++
      continue
    }

    const buf = [line]
    i++
    while (i < lines.length && !isBlockStart(lines[i])) buf.push(lines[i++])
    out.push(<p key={k++}>{inline(buf.join(' '))}</p>)
  }

  return <div className="md">{out}</div>
}
