import { loadCommandsFor, renderCommandSvg, renderOgPng } from '../../../utils/og'

const sanitise = (text, max) => {
  const cleaned = String(text).replace(/\s+/g, ' ').trim()
  if (cleaned.length <= max) return cleaned
  const truncated = cleaned.slice(0, max - 1)
  const lastSpace = truncated.lastIndexOf(' ')
  return (lastSpace > max * 0.6 ? truncated.slice(0, lastSpace) : truncated) + '…'
}

export default defineEventHandler(async (event) => {
  const params = event.context.params || {}
  const version = params.version
  const commandSlug = (params.command ?? params['command.png'] ?? '').replace(/\.png$/, '')
  const commands = await loadCommandsFor(version)

  if (!commands) {
    throw createError({ statusCode: 404, statusMessage: `Unknown version: ${version}` })
  }

  const command = commands.find(c => c.name.replace(':', '') === commandSlug)

  if (!command) {
    throw createError({ statusCode: 404, statusMessage: `Unknown command: ${commandSlug}` })
  }

  const svg = renderCommandSvg({
    command: command.name,
    description: sanitise(command.description, 200),
    version,
  })
  const pngBuffer = await renderOgPng(svg)

  setResponseHeaders(event, {
    'Content-Type': 'image/png',
    'Cache-Control': 'public, max-age=86400, s-maxage=86400, immutable',
  })

  return pngBuffer
})
