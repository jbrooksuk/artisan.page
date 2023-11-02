import { laravel } from '../../manifest.json'
import fs from 'node:fs'

export default defineEventHandler(async () => {
    const versions = [...laravel].map((version) => ({
        loc: `${version}/`,
        changefreq: 'weekly',
        priority: 1.0,
    }))

    const pages = [...laravel].map((version) => {
        return JSON.parse(fs.readFileSync(`./assets/${version}.json`)).flatMap((command) => ({
            loc: `${version}/${command.name.replace(':', '')}`,
            changefreq: 'weekly',
            priority: 1.0,
        }))
    })

    return versions.concat(...pages)
})
