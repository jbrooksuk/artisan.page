import { laravel } from '../../manifest.json'
import fs from 'node:fs'
import { sendStream } from 'h3'

export default defineEventHandler((event) => {
  const version = getRouterParam(event, 'version')

  if (!laravel.includes(version)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Version does not exist. Versions available: ' + laravel.join(', '),
    })
  }

  return sendStream(event, fs.createReadStream(`./assets/${version}.json`))
})
