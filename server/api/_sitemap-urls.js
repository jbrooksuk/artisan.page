import { laravel } from '../../manifest.json'

const versionMap = {
  '10.x': () => import(`~/assets/10.x.json`),
  '9.x': () => import(`~/assets/9.x.json`),
  '8.x': () => import(`~/assets/8.x.json`),
  '7.x': () => import(`~/assets/7.x.json`),
  '6.x': () => import(`~/assets/6.x.json`),
  '5.x': () => import(`~/assets/5.x.json`),
}

export default defineEventHandler(async () => {
    const versions = [...laravel].map((version) => ({
        loc: `/${version}/`,
        changefreq: 'weekly',
        priority: 1.0,
    }))

    const pages = await Promise.all(Object.keys(versionMap).map(async (version) => {
      const commands = await versionMap[version]()

      return commands.default.flatMap((command) => ({
        loc: `/${version}/${command.name.replace(':', '')}`,
        changefreq: 'weekly',
        priority: 1.0,
      }))
    }))

    return versions.concat(...pages)
})
