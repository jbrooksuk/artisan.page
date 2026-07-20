import { describe, expect, it } from 'vitest'
import { configuration, laravel, packages } from '~/manifest.json'
import packageCommandsHandler from '~/server/api/[version]/[vendor]/[package].js'
import versionPackagesHandler from '~/server/api/[version]/packages.js'
import versionHandler from '~/server/api/[version].js'
import packagesHandler from '~/server/api/packages.js'
import versionsHandler from '~/server/api/versions.js'
import { makeEvent } from '../helpers/event.js'

const latest = laravel[0]

describe('GET /api/versions', () => {
  it('returns the manifest version list', () => {
    expect(versionsHandler(makeEvent())).toEqual(laravel)
  })
})

describe('GET /api/packages', () => {
  it('returns every package name without a version suffix', () => {
    const result = packagesHandler(makeEvent())
    expect(result).toHaveLength(packages.length)
    for (const pkg of result) {
      expect(pkg).toMatch(/^[\w.-]+\/[\w.-]+$/)
    }
  })
})

describe('GET /api/[version]', () => {
  it('returns the command list for a known version', async () => {
    const commands = await versionHandler(makeEvent({ params: { version: latest } }))
    expect(commands.length).toBeGreaterThan(0)
    expect(commands[0]).toHaveProperty('name')
    expect(commands[0]).toHaveProperty('synopsis')
  })

  it('resolves "latest" to the newest version', async () => {
    const viaAlias = await versionHandler(makeEvent({ params: { version: 'latest' } }))
    const direct = await versionHandler(makeEvent({ params: { version: latest } }))
    expect(viaAlias).toEqual(direct)
  })

  it('serves every version listed in the manifest', async () => {
    for (const version of laravel) {
      const commands = await versionHandler(makeEvent({ params: { version } }))
      expect(commands.length, version).toBeGreaterThan(0)
    }
  })

  it('404s for an unknown version', async () => {
    await expect(versionHandler(makeEvent({ params: { version: '99.x' } })))
      .rejects.toMatchObject({ statusCode: 404 })
  })
})

describe('GET /api/[version]/packages', () => {
  it('returns the configured packages for a version', () => {
    const result = versionPackagesHandler(makeEvent({ params: { version: latest } }))
    expect(result).toEqual(configuration[latest].map((pkg) => pkg.split(':')[0]))
  })

  it('resolves "latest" to the newest version', () => {
    expect(versionPackagesHandler(makeEvent({ params: { version: 'latest' } })))
      .toEqual(versionPackagesHandler(makeEvent({ params: { version: latest } })))
  })

  it('404s for an unknown version', () => {
    expect(() => versionPackagesHandler(makeEvent({ params: { version: '99.x' } })))
      .toThrowError(expect.objectContaining({ statusCode: 404 }))
  })
})

describe('GET /api/[version]/[vendor]/[package]', () => {
  it('returns only commands namespaced to the package', async () => {
    const commands = await packageCommandsHandler(makeEvent({
      params: { version: latest, vendor: 'laravel', package: 'horizon' },
    }))
    expect(commands.length).toBeGreaterThan(0)
    for (const command of commands) {
      expect(command.name).toMatch(/^horizon:/)
    }
  })

  it('404s for a package not configured for the version', async () => {
    await expect(packageCommandsHandler(makeEvent({
      params: { version: latest, vendor: 'acme', package: 'unknown' },
    }))).rejects.toMatchObject({ statusCode: 404 })
  })

  it('404s for an unknown version', async () => {
    await expect(packageCommandsHandler(makeEvent({
      params: { version: '99.x', vendor: 'laravel', package: 'horizon' },
    }))).rejects.toMatchObject({ statusCode: 404 })
  })
})
