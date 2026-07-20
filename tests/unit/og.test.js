import { describe, expect, it } from 'vitest'
import { laravel } from '~/manifest.json'
import { loadCommandsFor, renderCommandSvg, renderVersionSvg } from '~/server/utils/og.js'

describe('loadCommandsFor', () => {
  it('loads the command list for a known version', async () => {
    const commands = await loadCommandsFor(laravel[0])
    expect(commands.length).toBeGreaterThan(0)
    expect(commands[0]).toHaveProperty('name')
  })

  it('returns null for an unknown version', async () => {
    expect(await loadCommandsFor('99.x')).toBeNull()
  })
})

describe('renderCommandSvg', () => {
  it('renders the command, description and version', () => {
    const svg = renderCommandSvg({
      command: 'migrate:fresh',
      description: 'Drop all tables and re-run all migrations',
      version: '13.x',
    })
    expect(svg).toContain('migrate:fresh')
    expect(svg).toContain('Drop all tables and re-run all migrations')
    expect(svg).toContain('Laravel 13.x')
    expect(svg).toContain('<svg width="1200" height="630"')
  })

  it('escapes XML special characters', () => {
    const svg = renderCommandSvg({ command: 'a<b', description: 'uses & and "quotes"', version: null })
    expect(svg).toContain('a&lt;b')
    expect(svg).toContain('uses &amp; and &quot;quotes&quot;')
    expect(svg).not.toContain('a<b')
  })

  it('truncates long descriptions', () => {
    const description = 'x'.repeat(200)
    const svg = renderCommandSvg({ command: 'noop', description, version: '13.x' })
    expect(svg).not.toContain(description)
    expect(svg).toContain('x'.repeat(87) + '...')
  })

  it('falls back to the tagline and omits the version line when absent', () => {
    const svg = renderCommandSvg({ command: 'noop', description: null, version: null })
    expect(svg).toContain('The Laravel Artisan Cheatsheet')
    expect(svg).not.toContain('Laravel undefined')
  })
})

describe('renderVersionSvg', () => {
  it('renders the version heading and command count', () => {
    const svg = renderVersionSvg({ version: '13.x', count: 262 })
    expect(svg).toContain('Laravel 13.x')
    expect(svg).toContain('262 Artisan commands')
  })

  it('falls back to generic copy without a version or count', () => {
    const svg = renderVersionSvg({ version: null, count: 0 })
    expect(svg).toContain('>Laravel</text>')
    expect(svg).toContain('Artisan command reference')
  })
})
