import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const siteUrl = 'https://artisan.page'

const manifest = JSON.parse(await readFile(resolve(root, 'manifest.json'), 'utf8'))

function commandUrl(version, command) {
  return `${siteUrl}/${version}/${command.name.replaceAll(':', '')}.md`
}

function text(value) {
  return value == null ? '' : String(value).replace(/\s+/g, ' ').trim()
}

function hasDefault(value) {
  return value !== null && value !== undefined && value !== false && value !== ''
    && !(Array.isArray(value) && value.length === 0)
}

function formatDefault(value) {
  return typeof value === 'string' ? `\`${value}\`` : `\`${JSON.stringify(value)}\``
}

function renderCommand(command, version) {
  const lines = [`### \`php artisan ${command.name}\``, '']
  const description = text(command.description)

  if (description) {
    lines.push(description, '')
  }

  const synopsis = text(command.synopsis) || command.name
  lines.push('```bash', `php artisan ${synopsis}`, '```')

  const arguments_ = Array.isArray(command.arguments) ? command.arguments : []
  if (arguments_.length) {
    lines.push('', 'Arguments:')
    for (const argument of arguments_) {
      const required = argument.required ? ' (required)' : ''
      const defaultValue = hasDefault(argument.default) ? `; default: ${formatDefault(argument.default)}` : ''
      const argumentDescription = text(argument.description)
      lines.push(`- \`${argument.name}\`${required}${argumentDescription ? ` — ${argumentDescription}` : ''}${defaultValue}`)
    }
  }

  const options = Array.isArray(command.options) ? [...command.options] : []
  if (options.length) {
    lines.push('', 'Options:')
    for (const option of options.sort((a, b) => a.name.localeCompare(b.name))) {
      const value = option.value_required ? ' (value required)' : option.value_optional ? ' (value optional)' : ''
      const defaultValue = hasDefault(option.default) ? `; default: ${formatDefault(option.default)}` : ''
      const optionDescription = text(option.description)
      lines.push(`- \`--${option.name}\`${value}${optionDescription ? ` — ${optionDescription}` : ''}${defaultValue}`)
    }
  }

  const aliases = Array.isArray(command.aliases) ? command.aliases : []
  if (aliases.length) {
    lines.push('', `Aliases: ${aliases.map((alias) => `\`${alias}\``).join(', ')}`)
  }

  lines.push('', `Source: ${commandUrl(version, command)}`)
  return lines.join('\n')
}

const commandSets = await Promise.all(manifest.laravel.map(async (version) => {
  const path = resolve(root, 'assets', `${version}.json`)
  const commands = JSON.parse(await readFile(path, 'utf8'))

  if (!Array.isArray(commands)) {
    throw new TypeError(`${path} must contain an array of commands`)
  }

  return [version, [...commands].sort((a, b) => a.name.localeCompare(b.name))]
}))

const index = [
  '# Artisan.page',
  '',
  "> A complete, versioned reference for Laravel's `php artisan` commands.",
  '',
  `The latest supported release is Laravel ${manifest.laravel[0]}. Use the version-specific command links below, or read the [complete reference](${siteUrl}/llms-full.txt) for command synopses, arguments, options, defaults, and aliases.`,
]

const full = [
  '# Artisan.page: Complete Artisan Command Reference',
  '',
  "> Every documented Laravel `php artisan` command, organised by framework version.",
  '',
  `For a compact index with links to each command page, see [llms.txt](${siteUrl}/llms.txt).`,
]

for (const [version, commands] of commandSets) {
  index.push('', `## Laravel ${version}${version === manifest.laravel[0] ? ' (latest)' : ''}`, '')
  for (const command of commands) {
    const description = text(command.description)
    index.push(`- [\`php artisan ${command.name}\`](${commandUrl(version, command)})${description ? ` — ${description}` : ''}`)
  }

  full.push('', `## Laravel ${version}`, '', `${commands.length} documented commands.`)
  for (const command of commands) {
    full.push('', renderCommand(command, version))
  }
}

await mkdir(resolve(root, 'public'), { recursive: true })
await Promise.all([
  writeFile(resolve(root, 'public/llms.txt'), `${index.join('\n')}\n`),
  writeFile(resolve(root, 'public/llms-full.txt'), `${full.join('\n')}\n`),
])
