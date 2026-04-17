import { lastModForVersion } from '../utils/lastmod'

export default defineEventHandler((event) => {
  const { version } = getQuery(event)
  return { lastmod: lastModForVersion(version ? String(version) : '') }
})
