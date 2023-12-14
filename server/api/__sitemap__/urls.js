import { laravel } from '../../../manifest.json'

const versionMap = {
  '10.x': () => import(`~/assets/10.x.json`),
  '9.x': () => import(`~/assets/9.x.json`),
  '8.x': () => import(`~/assets/8.x.json`),
  '7.x': () => import(`~/assets/7.x.json`),
  '6.x': () => import(`~/assets/6.x.json`),
  '5.x': () => import(`~/assets/5.x.json`),
}

const versionPriority = (version) => {
  return {
    '10.x': 1.0,
    '9.x': 0.8,
  }[version] || 0.4
}

const changeFrequency = (version) => {
  return {
    '10.x': 'weekly',
    '9.x': 'weekly',
  }[version] || 'monthly'
}

const lastMod = (version) => {
  return {
    '8.x': '2023-01-24T00:00:00.000Z',
    '7.x': '2021-03-03T00:00:00.000Z',
    '6.x': '2022-09-06T00:00:00.000Z',
    '5.x': '202-02-26T00:00:00.000Z',
  }[version] || new Date()
}

export default defineSitemapEventHandler(async () => {
  const versions = [...laravel].map((version) => ({
    loc: `/${version}/`,
    changefreq: 'weekly',
    priority: versionPriority(version),
    lastmod: lastMod(version)
  }))

  const pages = await Promise.all(Object.keys(versionMap).map(async (version) => {
    const commands = await versionMap[version]()

    return commands.default.map((command) => ({
      loc: `/${version}/${command.name.replace(':', '')}`,
      changefreq: changeFrequency(version),
      priority: versionPriority(version),
      lastmod: lastMod(version),
    }))
  }))

  return [{
    loc: '/',
    changefreq: 'weekly',
    priority: 1.0,
    lastmod: new Date(),
  }, ...versions, ...pages.flat()]
})
