import manifest from '../../manifest.json'

export default defineEventHandler((event) => {
  return manifest.laravel
})
