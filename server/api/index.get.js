import Fuse from 'fuse.js'
import { laravel as versions } from '../../manifest.json'
import commands from 'assets'

export default defineEventHandler(event => {
  const { v, s: search } = useQuery(event)

  // Grab the version from v=8.x or the latest if not supplied
  const version = versions.find(version => version === v) ?? versions[0]
  const json = commands?.[version]

  // Search the list for the search term if provided
  let results
  if (search) {
    const fuse = new Fuse(json, { keys: ['name', 'description', 'aliases'] })
    results = fuse.search(search).map(result => result.item)
  }

  // Return results or the entire list
  return {
    version: version,
    commands: results ?? json,
  }
})
