import { laravel } from '../../manifest.json'

const versionMap = {
  '13.x': () => import('~/assets/13.x.json'),
  '12.x': () => import('~/assets/12.x.json'),
  '11.x': () => import('~/assets/11.x.json'),
  '10.x': () => import('~/assets/10.x.json'),
  '9.x': () => import('~/assets/9.x.json'),
  '8.x': () => import('~/assets/8.x.json'),
  '7.x': () => import('~/assets/7.x.json'),
  '6.x': () => import('~/assets/6.x.json'),
  '5.x': () => import('~/assets/5.x.json'),
}

function prefersMarkdown(accept) {
  if (!accept) return false

  const entries = accept.split(',').map((part) => {
    const [type, ...params] = part.trim().split(';').map((s) => s.trim())
    const qParam = params.find((p) => p.startsWith('q='))
    const q = qParam ? parseFloat(qParam.slice(2)) : 1
    return { type: (type || '').toLowerCase(), q: Number.isFinite(q) ? q : 1 }
  })

  const mdQ = entries
    .filter((e) => e.type === 'text/markdown')
    .reduce((max, e) => Math.max(max, e.q), -1)
  if (mdQ < 0) return false

  const htmlQ = entries
    .filter((e) => e.type === 'text/html' || e.type === 'application/xhtml+xml')
    .reduce((max, e) => Math.max(max, e.q), -1)

  return mdQ >= htmlQ
}

function parsePath(pathname) {
  const clean = pathname.replace(/\/+$/, '') || '/'
  if (clean === '/') return { route: 'index' }

  const parts = clean.split('/').filter(Boolean)
  if (parts.length === 1 && /^\d+\.x$/.test(parts[0])) {
    return { route: 'version', version: parts[0] }
  }
  if (parts.length === 2 && /^\d+\.x$/.test(parts[0]) && /^[\w-]+$/.test(parts[1])) {
    return { route: 'command', version: parts[0], command: parts[1] }
  }
  return null
}

function renderHome() {
  const lines = []
  lines.push('# Artisan.page')
  lines.push('')
  lines.push('> The Laravel Artisan cheatsheet — browse every `php artisan` command from Laravel 5.x through 13.x.')
  lines.push('')
  lines.push(`The latest supported version is **Laravel ${laravel[0]}**.`)
  lines.push('')
  lines.push('## Versions')
  lines.push('')
  for (const v of laravel) {
    lines.push(`- [Laravel ${v}](https://artisan.page/${v})`)
  }
  lines.push('')
  lines.push('## Resources')
  lines.push('')
  lines.push('- Documentation for agents: https://artisan.page/llms.txt')
  lines.push('- API catalog: https://artisan.page/.well-known/api-catalog')
  lines.push('- Source: https://github.com/jbrooksuk/artisan.page')
  return lines.join('\n')
}

function renderVersionIndex(version, commands) {
  const lines = []
  lines.push(`# Laravel ${version} Artisan commands`)
  lines.push('')
  lines.push(`> The complete list of \`php artisan\` commands available in Laravel ${version}.`)
  lines.push('')
  lines.push(`${commands.length} commands are documented.`)
  lines.push('')
  lines.push('## Commands')
  lines.push('')
  for (const cmd of commands) {
    const slug = cmd.name.replace(':', '')
    const desc = cmd.description ? ` — ${cmd.description}` : ''
    lines.push(`- [\`php artisan ${cmd.name}\`](https://artisan.page/${version}/${slug})${desc}`)
  }
  lines.push('')
  lines.push(`Source: https://artisan.page/${version}`)
  return lines.join('\n')
}

function renderCommand(command, version) {
  const lines = []
  lines.push(`# \`php artisan ${command.name}\``)
  lines.push('')
  if (command.description) {
    lines.push(`> ${command.description}`)
    lines.push('')
  }
  lines.push(`**Laravel version:** ${version}`)
  lines.push('')
  lines.push('## Synopsis')
  lines.push('')
  lines.push('```bash')
  lines.push(`php artisan ${command.synopsis}`)
  lines.push('```')

  if (command.arguments && command.arguments.length) {
    lines.push('')
    lines.push('## Arguments')
    lines.push('')
    for (const arg of command.arguments) {
      const required = arg.required ? ' *(required)*' : ''
      const description = arg.description ? ` — ${arg.description}` : ''
      lines.push(`- \`${arg.name}\`${required}${description}`)
    }
  }

  if (command.options && command.options.length) {
    lines.push('')
    lines.push('## Options')
    lines.push('')
    const sorted = [...command.options].sort((a, b) => a.name.localeCompare(b.name))
    for (const opt of sorted) {
      const required = opt.value_required ? ' *(value required)*' : ''
      const description = opt.description ? ` — ${opt.description}` : ''
      lines.push(`- \`--${opt.name}\`${required}${description}`)
    }
  }

  if (command.aliases && command.aliases.length) {
    lines.push('')
    lines.push('## Aliases')
    lines.push('')
    for (const alias of command.aliases) {
      lines.push(`- \`${alias}\``)
    }
  }

  const slug = command.name.replace(':', '')
  lines.push('')
  lines.push(`Source: https://artisan.page/${version}/${slug}`)
  return lines.join('\n')
}

export default defineEventHandler(async (event) => {
  const method = event.method || event.node?.req?.method || 'GET'
  if (method !== 'GET' && method !== 'HEAD') return

  const url = getRequestURL(event)
  const parsed = parsePath(url.pathname)
  if (!parsed) return

  setHeader(event, 'Vary', 'Accept')

  const accept = getHeader(event, 'accept')
  if (!prefersMarkdown(accept)) return

  let body
  if (parsed.route === 'index') {
    body = renderHome()
  } else if (parsed.route === 'version') {
    if (!laravel.includes(parsed.version)) return
    const commands = (await versionMap[parsed.version]()).default
    body = renderVersionIndex(parsed.version, commands)
  } else if (parsed.route === 'command') {
    if (!laravel.includes(parsed.version)) return
    const commands = (await versionMap[parsed.version]()).default
    const match = commands.find((c) => c.name.replace(':', '') === parsed.command)
    if (!match) return
    body = renderCommand(match, parsed.version)
  }

  if (!body) return

  const tokens = Math.ceil(body.length / 4)
  setHeader(event, 'Content-Type', 'text/markdown; charset=utf-8')
  setHeader(event, 'x-markdown-tokens', String(tokens))
  return body
})
