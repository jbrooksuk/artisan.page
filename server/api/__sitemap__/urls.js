import { laravel } from '../../../manifest.json'
import { lastModForVersion } from '../../utils/lastmod'

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

const versionPriority = (version) => {
  return {
    '13.x': 1.0,
    '12.x': 0.9,
    '11.x': 0.8,
    '10.x': 0.7,
    '9.x': 0.5,
  }[version] || 0.4
}

const changeFrequency = (version) => {
  return {
    '13.x': 'weekly',
    '12.x': 'weekly',
    '11.x': 'weekly',
    '10.x': 'weekly',
  }[version] || 'monthly'
}

export default defineSitemapEventHandler(async () => {
  const versions = [...laravel].map((version) => ({
    loc: `/${version}`,
    changefreq: changeFrequency(version),
    priority: versionPriority(version),
    lastmod: lastModForVersion(version)
  }))

  const pages = await Promise.all(Object.keys(versionMap).map(async (version) => {
    const commands = await versionMap[version]()

    return commands.default.map((command) => ({
      loc: `/${version}/${command.name.replace(':', '')}`,
      changefreq: changeFrequency(version),
      priority: versionPriority(version),
      lastmod: lastModForVersion(version),
    }))
  }))

  const homeLastMod = laravel
    .map((version) => lastModForVersion(version))
    .sort()
    .pop() || new Date().toISOString().split('T')[0]

  return [{
    loc: '/',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: homeLastMod
  }, ...versions, ...pages.flat()]
})
