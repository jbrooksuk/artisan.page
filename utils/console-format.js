// Parse Symfony console formatter tags such as
//   <fg=red>...</>            <bg=blue>...</>            <options=bold,underscore>...</>
//   <fg=red;bg=blue>...</>    <error>...</>              <info>...</info>
// and return a flat list of { text, style } segments. Closing tags `</>` and
// any `</...>` form pop the most recent open tag.
//
// Style is `{ fg, bg, options: string[] }`. Anything not parsed cleanly falls
// through as plain text.

const NAMED_TAGS = {
  error: { fg: 'white', bg: 'red' },
  info: { fg: 'green' },
  comment: { fg: 'yellow' },
  question: { fg: 'black', bg: 'cyan' },
}

const TAG_RE = /<(\/?)([a-z][a-z0-9_=,;-]*)?>/gi

function parseStyleBody(body) {
  if (!body.includes('=')) return NAMED_TAGS[body] || null
  const style = {}
  for (const part of body.split(';')) {
    const [k, v] = part.split('=')
    if (!k || !v) continue
    if (k === 'options') style.options = v.split(',').map(s => s.trim()).filter(Boolean)
    else if (k === 'fg' || k === 'bg') style[k] = v
  }
  return Object.keys(style).length ? style : null
}

export function parseConsole(input) {
  if (input == null) return []
  const text = String(input)
  if (!text.includes('<')) return [{ text, style: null }]

  const segments = []
  const stack = []
  let lastIndex = 0
  let match
  TAG_RE.lastIndex = 0

  while ((match = TAG_RE.exec(text)) !== null) {
    const [, slash, body = ''] = match
    const isClose = slash === '/'

    // `<>` with no slash is not a valid format tag — let it render as literal.
    if (!isClose && !body) continue

    const style = isClose ? null : parseStyleBody(body)

    // Treat unrecognised opens as literal text — keep the original tag.
    if (!isClose && !style) continue

    if (match.index > lastIndex) {
      segments.push({ text: text.slice(lastIndex, match.index), style: stack[stack.length - 1] || null })
    }

    if (isClose) stack.pop()
    else stack.push(style)

    lastIndex = TAG_RE.lastIndex
  }

  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), style: stack[stack.length - 1] || null })
  }

  return segments.filter(s => s.text.length)
}

export function stripConsole(input) {
  return parseConsole(input).map(s => s.text).join('')
}

const FG = {
  black: 'text-gray-900 dark:text-gray-100',
  red: 'text-red-600 dark:text-red-400',
  green: 'text-green-600 dark:text-green-400',
  yellow: 'text-yellow-600 dark:text-yellow-400',
  blue: 'text-blue-600 dark:text-blue-400',
  magenta: 'text-fuchsia-600 dark:text-fuchsia-400',
  cyan: 'text-cyan-600 dark:text-cyan-400',
  white: 'text-white',
  default: '',
}

const BG = {
  black: 'bg-gray-900 text-gray-50',
  red: 'bg-red-500/10 text-red-700 dark:bg-red-500/15 dark:text-red-300',
  green: 'bg-green-500/10 text-green-700 dark:bg-green-500/15 dark:text-green-300',
  yellow: 'bg-yellow-500/10 text-yellow-800 dark:bg-yellow-500/15 dark:text-yellow-300',
  blue: 'bg-blue-500/10 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300',
  magenta: 'bg-fuchsia-500/10 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-300',
  cyan: 'bg-cyan-500/10 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300',
  white: 'bg-gray-100 text-gray-900',
  default: '',
}

export function styleClasses(style) {
  if (!style) return ''
  const classes = []
  // bg wins over fg for visible foreground colour, since Symfony's `<bg=red>`
  // implicitly uses a contrasting text colour.
  if (style.bg) classes.push(BG[style.bg] || '', 'inline-block px-1.5 py-0.5 rounded')
  else if (style.fg) classes.push(FG[style.fg] || '')
  if (style.options?.includes('bold')) classes.push('font-bold')
  if (style.options?.includes('underscore')) classes.push('underline')
  return classes.filter(Boolean).join(' ')
}
