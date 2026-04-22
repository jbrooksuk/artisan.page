import { configuration, laravel } from '../../../manifest.json'

export default defineEventHandler((event) => {
  let version = getRouterParam(event, 'version')

  if (version === 'latest') {
    version = laravel[0]
  }

  if (!laravel.includes(version)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Version does not exist. Versions available: ' + laravel.join(', '),
    })
  }

  const packages = configuration[version]

  if (!packages) {
    throw createError({
      statusCode: 404,
      statusMessage: `No package configuration for ${version}`,
    })
  }

  return packages.map((pkg) => pkg.split(':')[0])
})
