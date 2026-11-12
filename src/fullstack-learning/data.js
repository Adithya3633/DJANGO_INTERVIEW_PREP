import source from './content/fullstack-fundamentals.md?raw'

const slugify = (text) =>
  text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

const tableSpecs = {
  'What is the difference between frontend validation and backend validation?': {
    headers: ['Frontend validation', 'Backend validation'],
    rows: 5,
  },
  'What are HTTP headers?': { headers: ['Header', 'Purpose'], rows: 7 },
  'What is the difference between PUT and PATCH?': {
    headers: ['PUT', 'PATCH'],
    rows: 4,
  },
  'What is the difference between fetch and Axios?': {
    headers: ['Fetch', 'Axios'],
    rows: 5,
  },
  'What is the difference between CORS and CSRF?': {
    headers: ['CORS', 'CSRF'],
    rows: 5,
  },
  'What is the difference between SQL and NoSQL?': {
    headers: ['SQL', 'NoSQL'],
    rows: 5,
  },
  'What is the difference between MySQL and PostgreSQL?': {
    headers: ['MySQL', 'PostgreSQL'],
    rows: 6,
  },
  'Difference between hashing, encoding and encryption?': {
    headers: ['Hashing', 'Encoding', 'Encryption'],
    rows: 5,
  },
  'Difference between access token and refresh token?': {
    headers: ['Access token', 'Refresh token'],
    rows: 6,
  },
  'Difference between session authentication and JWT authentication?': {
    headers: ['Session authentication', 'JWT authentication'],
    rows: 5,
  },
  'Where should we store JWT tokens in React?': {
    headers: ['Storage', 'Characteristics'],
    rows: 5,
  },
  'What is the difference between cookies and localStorage?': {
    headers: ['Cookies', 'localStorage'],
    rows: 6,
  },
  'What is the SameSite attribute?': {
    headers: ['Value', 'Meaning'],
    rows: 4,
  },
  'Difference between CSRF token and JWT?': {
    headers: ['CSRF token', 'JWT'],
    rows: 5,
  },
  'Difference between CSRF and XSS?': {
    headers: ['CSRF', 'XSS'],
    rows: 5,
  },
  'Explain how CRUD works in a full-stack application.': {
    headers: ['Operation', 'React', 'HTTP', 'Django', 'Database'],
    rows: 5,
  },
}

function findCellBlock(lines, headers, rowCount) {
  const content = lines
    .map((text, index) => ({ text: text.trim(), index }))
    .filter(({ text }) => text)
  const cellCount = headers.length * rowCount

  for (let start = 0; start <= content.length - cellCount; start++) {
    if (headers.every((header, offset) => content[start + offset].text === header)) {
      return {
        startLine: content[start].index,
        endLine: content[start + cellCount - 1].index,
        cells: content.slice(start, start + cellCount).map(({ text }) => text),
      }
    }
  }
  return null
}

function markdownTable(body, spec) {
  if (!spec) return body
  const lines = body.split(/\r?\n/)
  const block = findCellBlock(lines, spec.headers, spec.rows)
  if (!block) return body

  const columnCount = spec.headers.length
  const rows = []
  for (let row = 0; row < spec.rows; row++) {
    rows.push(`| ${block.cells.slice(row * columnCount, (row + 1) * columnCount).join(' | ')} |`)
    if (row === 0) rows.push(`| ${spec.headers.map(() => '---').join(' | ')} |`)
  }
  lines.splice(block.startLine, block.endLine - block.startLine + 1, ...rows)
  return lines.join('\n')
}

function insertArchitectureFlow(body, flowcharts) {
  const lines = body.split(/\r?\n/)
  const block = findCellBlock(
    lines,
    ['React Frontend', 'User interface · Forms · State'],
    4
  )
  if (!block) return body

  const steps = []
  for (let index = 0; index < block.cells.length; index += 2) {
    steps.push({ title: block.cells[index], detail: block.cells[index + 1] })
  }
  const flowIndex = flowcharts.push({ orientation: 'horizontal', steps }) - 1
  lines.splice(block.startLine, block.endLine - block.startLine + 1, `{{FULLSTACK_FLOW_${flowIndex}}}`)
  return lines.join('\n')
}

function insertArrowFlows(body, flowcharts) {
  return body.replace(/```\s*\r?\n([^\r\n]+)\r?\n```/g, (block, line) => {
    if (!line.includes('→')) return block
    const steps = line.split('→').map((title) => ({ title: title.trim() }))
    if (steps.length < 2) return block
    const flowIndex = flowcharts.push({ orientation: 'horizontal', steps }) - 1
    return `{{FULLSTACK_FLOW_${flowIndex}}}`
  })
}

function insertNumberedFlow(body, flowcharts) {
  const lines = body.split(/\r?\n/)
  const startLine = lines.findIndex((line) => /^\s*1\.\s+/.test(line))
  if (startLine < 0) return body

  const steps = []
  let lineIndex = startLine
  let expectedNumber = 1
  let endLine = startLine

  while (lineIndex < lines.length) {
    const heading = /^\s*(\d+)\.\s+(.+)$/.exec(lines[lineIndex])
    if (!heading || Number(heading[1]) !== expectedNumber) break
    let detailIndex = lineIndex + 1
    while (detailIndex < lines.length && !lines[detailIndex].trim()) detailIndex++
    if (detailIndex >= lines.length || /^\s*\d+\.\s+/.test(lines[detailIndex])) break

    steps.push({ title: heading[2].trim(), detail: lines[detailIndex].trim() })
    endLine = detailIndex
    lineIndex = detailIndex + 1
    while (lineIndex < lines.length && !lines[lineIndex].trim()) lineIndex++
    expectedNumber++
  }

  if (steps.length < 3) return body
  const flowIndex = flowcharts.push({ orientation: 'vertical', steps }) - 1
  lines.splice(startLine, endLine - startLine + 1, `{{FULLSTACK_FLOW_${flowIndex}}}`)
  return lines.join('\n')
}

function parseSections(markdown) {
  const sections = []
  let section = null
  let question = null

  const saveQuestion = () => {
    if (!question || !section) return
    const flowcharts = []
    let body = question.lines.join('\n').trim()
    if (question.title === 'How does frontend communicate with backend?') {
      body = insertArchitectureFlow(body, flowcharts)
    }
    if (question.title === 'Explain access token and refresh token flow.') {
      body = insertNumberedFlow(body, flowcharts)
    }
    body = insertArrowFlows(body, flowcharts)
    body = markdownTable(body, tableSpecs[question.title])
    section.questions.push({
      id: `${section.id}-${slugify(question.title)}`,
      title: question.title,
      body,
      flowcharts,
      number: section.questions.length + 1,
    })
    question = null
  }

  for (const line of markdown.split(/\r?\n/)) {
    const sectionHeading = /^##\s+(.+)$/.exec(line)
    if (sectionHeading) {
      saveQuestion()
      section = {
        id: slugify(sectionHeading[1]),
        title: sectionHeading[1],
        questions: [],
      }
      sections.push(section)
      continue
    }

    const questionHeading = /^###\s+(.+)$/.exec(line)
    if (questionHeading) {
      saveQuestion()
      if (!section) {
        throw new Error('Full-stack learning content has a question before its first section.')
      }
      question = { title: questionHeading[1], lines: [] }
      continue
    }

    if (question) question.lines.push(line)
  }

  saveQuestion()
  return sections
}

export const sections = parseSections(source)
export const allQuestions = sections.flatMap((section) =>
  section.questions.map((question) => ({ ...question, sectionId: section.id, sectionTitle: section.title }))
)
