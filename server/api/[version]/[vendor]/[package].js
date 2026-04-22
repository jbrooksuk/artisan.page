import { configuration, laravel } from '../../../../manifest.json'

const versionMap = {
  '13.x': () => import(`~/assets/13.x.json`),
  '12.x': () => import(`~/assets/12.x.json`),
  '11.x': () => import(`~/assets/11.x.json`),
  '10.x': () => import(`~/assets/10.x.json`),
  '9.x': () => import(`~/assets/9.x.json`),
  '8.x': () => import(`~/assets/8.x.json`),
  '7.x': () => import(`~/assets/7.x.json`),
  '6.x': () => import(`~/assets/6.x.json`),
  '5.x': () => import(`~/assets/5.x.json`),
}

export default defineEventHandler(async (event) => {
  let version = getRouterParam(event, 'version')
  const vendor = getRouterParam(event, 'vendor')
  const pkg = getRouterParam(event, 'package')

  if (version === 'latest') {
    version = laravel[0]
  }

  if (!laravel.includes(version)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Version does not exist. Versions available: ' + laravel.join(', '),
    })
  }

  const fullName = `${vendor}/${pkg}`
  const versionPackages = configuration[version] || []

  if (!versionPackages.includes(fullName)) {
    throw createError({
      statusCode: 404,
      statusMessage: `Package ${fullName} is not available for ${version}`,
    })
  }

  const commands = (await versionMap[version]()).default

  // Commands for a package use the last segment of its name as the Artisan
  // namespace prefix (e.g. laravel/nova -> nova:*, laravel/horizon -> horizon:*).
  const prefix = `${pkg}:`

  return commands.filter((command) => command.name.startsWith(prefix))
})
