import { loadCommandsFor, renderOgPng, renderVersionSvg } from '../../utils/og'

export default defineEventHandler(async (event) => {
  const params = event.context.params || {}
  const version = (params.version ?? params['version.png'] ?? '').replace(/\.png$/, '')
  const commands = await loadCommandsFor(version)

  if (!commands) {
    throw createError({ statusCode: 404, statusMessage: `Unknown version: ${version}` })
  }

  const svg = renderVersionSvg({ version, count: commands.length })
  const pngBuffer = await renderOgPng(svg)

  setResponseHeaders(event, {
    'Content-Type': 'image/png',
    'Cache-Control': 'public, max-age=86400, s-maxage=86400, immutable',
  })

  return pngBuffer
})
