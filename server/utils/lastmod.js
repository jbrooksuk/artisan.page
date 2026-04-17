import { execSync } from 'node:child_process'

const fixedLastMod = {
  '8.x': '2023-01-24',
  '7.x': '2021-03-03',
  '6.x': '2022-09-06',
  '5.x': '2020-02-26',
}

const cache = new Map()
const today = () => new Date().toISOString().split('T')[0]

export const lastModForVersion = (version) => {
  if (!version) return today()
  if (fixedLastMod[version]) return fixedLastMod[version]
  if (cache.has(version)) return cache.get(version)

  let date = ''
  try {
    date = execSync(`git log -1 --format=%cs -- assets/${version}.json`, {
      encoding: 'utf8',
    }).trim()
  } catch {}

  const resolved = date || today()
  cache.set(version, resolved)
  return resolved
}
