import { describe, expect, it } from 'vitest'
import { laravel } from '~/manifest.json'
import markdownMiddleware from '~/server/middleware/markdown.js'
import { makeEvent } from '../helpers/event.js'

const latest = laravel[0]

const request = (path, accept = 'text/markdown', method = 'GET') => {
  const event = makeEvent({ path, method, headers: accept ? { Accept: accept } : {} })
  return { event, response: markdownMiddleware(event) }
}

describe('markdown middleware', () => {
  it('serves the home page as markdown when the client prefers it', async () => {
    const { event, response } = request('/')
    const body = await response
    expect(body).toMatch(/^# Artisan\.page/)
    expect(body).toContain(`[Laravel ${latest}](https://artisan.page/${latest})`)
    expect(event.responseHeaders['Content-Type']).toBe('text/markdown; charset=utf-8')
    expect(event.responseHeaders['Vary']).toBe('Accept')
    expect(Number(event.responseHeaders['x-markdown-tokens'])).toBeGreaterThan(0)
  })

  it('serves a version index listing every command', async () => {
    const body = await request(`/${latest}`).response
    expect(body).toContain(`# Laravel ${latest} Artisan commands`)
    expect(body).toContain('php artisan migrate')
  })

  it('serves a command page found by its slug', async () => {
    const body = await request(`/${latest}/migrateinstall`).response
    expect(body).toContain('# `php artisan migrate:install`')
    expect(body).toContain('## Synopsis')
  })

  it('ignores a trailing slash', async () => {
    const body = await request(`/${latest}/`).response
    expect(body).toContain(`# Laravel ${latest} Artisan commands`)
  })

  it('passes through when the client prefers HTML', async () => {
    expect(await request('/', 'text/html,application/xhtml+xml').response).toBeUndefined()
    expect(await request('/', null).response).toBeUndefined()
  })

  it('honours Accept q-values', async () => {
    expect(await request('/', 'text/html;q=1,text/markdown;q=0.5').response).toBeUndefined()
    expect(await request('/', 'text/markdown;q=0.9,text/html;q=0.8').response).toBeDefined()
    // Equal weight goes to markdown.
    expect(await request('/', 'text/markdown,text/html').response).toBeDefined()
  })

  it('still sets Vary on negotiated paths that fall through to HTML', async () => {
    const { event, response } = request('/', 'text/html')
    await response
    expect(event.responseHeaders['Vary']).toBe('Accept')
  })

  it('passes through unknown versions and commands', async () => {
    expect(await request('/99.x').response).toBeUndefined()
    expect(await request(`/${latest}/not-a-real-command`).response).toBeUndefined()
  })

  it('passes through paths it does not own', async () => {
    const { event, response } = request('/api/versions')
    expect(await response).toBeUndefined()
    expect(event.responseHeaders).toEqual({})
  })

  it('passes through non-GET requests', async () => {
    expect(await request('/', 'text/markdown', 'POST').response).toBeUndefined()
  })
})
