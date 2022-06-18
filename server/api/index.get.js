import { join } from 'path'
import { readFileSync } from 'fs'
import Fuse from 'fuse.js'
import manifest from '../../manifest.json'

const versions = manifest.laravel
const versionCache = new Map()

export default defineEventHandler(event => {
  const { v, s: search } = useQuery(event)

  // Grab the version from v=8.x or the latest if not supplied
  const version = versions.find(version => version === v) ?? versions[0]

  // Grab and cache the requested version
  let json
  if (versionCache.has(version)) {
    json = versionCache.get(version)
  } else {
    const filePath = `${join(process.cwd(), '/assets')}/${version}.json`
    json = JSON.parse(readFileSync(filePath, 'utf8'))
    versionCache.set(version, json)
  }

  // Search the list for the search term if provided
  let results
  if (search) {
    const fuse = new Fuse(json, { keys: ['name', 'description', 'aliases'] })
    results = fuse.search(search).map(result => result.item)
  }

  // Return results or the entire list
  return results ?? json
})
