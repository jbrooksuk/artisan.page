import { packages } from '../../manifest.json'

export default defineEventHandler((event) => {
  return packages.map((pkg) => pkg.split(':')[0])
})
