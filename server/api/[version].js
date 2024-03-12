import { laravel } from '../../manifest.json'

const versionMap = {
  '11.x': () => import(`~/assets/11.x.json`),
  '10.x': () => import(`~/assets/10.x.json`),
  '9.x': () => import(`~/assets/9.x.json`),
  '8.x': () => import(`~/assets/8.x.json`),
  '7.x': () => import(`~/assets/7.x.json`),
  '6.x': () => import(`~/assets/6.x.json`),
  '5.x': () => import(`~/assets/5.x.json`),
}

export default defineEventHandler(async (event) => {
  const version = getRouterParam(event, 'version')

  if (!laravel.includes(version)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Version does not exist. Versions available: ' + laravel.join(', '),
    })
  }

  const commands = await versionMap[version]()

  return commands.default
})
