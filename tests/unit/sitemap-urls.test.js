import { readFileSync } from 'node:fs'
import { beforeAll, describe, expect, it } from 'vitest'
import { laravel } from '~/manifest.json'
import sitemapHandler from '~/server/api/__sitemap__/urls.js'
import { makeEvent } from '../helpers/event.js'

describe('GET /api/__sitemap__/urls', () => {
  let entries

  beforeAll(async () => {
    entries = await sitemapHandler(makeEvent())
  })

  it('starts with the home page at full priority', () => {
    expect(entries[0]).toMatchObject({ loc: '/', priority: 1.0 })
  })

  it('includes an entry for every version', () => {
    const locs = new Set(entries.map((e) => e.loc))
    for (const version of laravel) {
      expect(locs.has(`/${version}`), version).toBe(true)
    }
  })

  it('includes a slugified entry for every command of every version', () => {
    const locs = new Set(entries.map((e) => e.loc))
    for (const version of laravel) {
      const commands = JSON.parse(
        readFileSync(new URL(`../../assets/${version}.json`, import.meta.url), 'utf-8'),
      )
      for (const command of commands) {
        const loc = `/${version}/${command.name.replace(':', '')}`
        expect(locs.has(loc), loc).toBe(true)
      }
    }
  })

  it('never emits a colon in a command URL', () => {
    for (const entry of entries) {
      expect(entry.loc).not.toContain(':')
    }
  })

  it('ranks newer versions above older ones', () => {
    const priority = (version) => entries.find((e) => e.loc === `/${version}`).priority
    expect(priority(laravel[0])).toBeGreaterThan(priority(laravel[laravel.length - 1]))
  })

  it('emits valid metadata on every entry', () => {
    for (const entry of entries) {
      expect(entry.loc).toMatch(/^\/[\w./-]*$/)
      expect(['weekly', 'monthly']).toContain(entry.changefreq)
      expect(entry.priority).toBeGreaterThan(0)
      expect(entry.priority).toBeLessThanOrEqual(1)
      expect(entry.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/)
    }
  })
})
