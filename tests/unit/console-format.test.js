import { describe, expect, it } from 'vitest'
import { parseConsole, stripConsole, styleClasses } from '~/utils/console-format'

describe('parseConsole', () => {
  it('returns an empty list for null and undefined', () => {
    expect(parseConsole(null)).toEqual([])
    expect(parseConsole(undefined)).toEqual([])
  })

  it('returns a single unstyled segment for plain text', () => {
    expect(parseConsole('Run the database migrations')).toEqual([
      { text: 'Run the database migrations', style: null },
    ])
  })

  it('coerces non-string input to text', () => {
    expect(parseConsole(42)).toEqual([{ text: '42', style: null }])
  })

  it('parses named Symfony tags', () => {
    expect(parseConsole('<info>Done</info>')).toEqual([
      { text: 'Done', style: { fg: 'green' } },
    ])
    expect(parseConsole('<error>Failed</error>')).toEqual([
      { text: 'Failed', style: { fg: 'white', bg: 'red' } },
    ])
    expect(parseConsole('<comment>Note</comment>')).toEqual([
      { text: 'Note', style: { fg: 'yellow' } },
    ])
    expect(parseConsole('<question>Sure?</question>')).toEqual([
      { text: 'Sure?', style: { fg: 'black', bg: 'cyan' } },
    ])
  })

  it('parses fg, bg and options attribute tags', () => {
    expect(parseConsole('<fg=red>x</>')).toEqual([
      { text: 'x', style: { fg: 'red' } },
    ])
    expect(parseConsole('<fg=red;bg=blue>x</>')).toEqual([
      { text: 'x', style: { fg: 'red', bg: 'blue' } },
    ])
    expect(parseConsole('<options=bold,underscore>x</>')).toEqual([
      { text: 'x', style: { options: ['bold', 'underscore'] } },
    ])
  })

  it('splits surrounding plain text into unstyled segments', () => {
    expect(parseConsole('a <info>b</info> c')).toEqual([
      { text: 'a ', style: null },
      { text: 'b', style: { fg: 'green' } },
      { text: ' c', style: null },
    ])
  })

  it('restores the outer style when a nested tag closes', () => {
    expect(parseConsole('<info>a<comment>b</>c</>')).toEqual([
      { text: 'a', style: { fg: 'green' } },
      { text: 'b', style: { fg: 'yellow' } },
      { text: 'c', style: { fg: 'green' } },
    ])
  })

  it('keeps an unclosed tag styled to the end of the string', () => {
    expect(parseConsole('<info>unclosed')).toEqual([
      { text: 'unclosed', style: { fg: 'green' } },
    ])
  })

  it('leaves unrecognised tags in place as literal text', () => {
    expect(parseConsole('use <Closure> here')).toEqual([
      { text: 'use <Closure> here', style: null },
    ])
    expect(stripConsole('a <foo> b')).toBe('a <foo> b')
  })

  it('leaves an empty <> pair as literal text', () => {
    expect(stripConsole('a <> b')).toBe('a <> b')
  })

  it('drops empty segments', () => {
    expect(parseConsole('<info></info>')).toEqual([])
  })
})

describe('stripConsole', () => {
  it('removes recognised tags and keeps their content', () => {
    expect(stripConsole('Run <info>migrate</info> first')).toBe('Run migrate first')
    expect(stripConsole('<fg=red;options=bold>Careful</>')).toBe('Careful')
  })

  it('passes plain text through unchanged', () => {
    expect(stripConsole('nothing to strip')).toBe('nothing to strip')
  })
})

describe('styleClasses', () => {
  it('returns an empty string for a null style', () => {
    expect(styleClasses(null)).toBe('')
  })

  it('maps foreground colours to text classes', () => {
    expect(styleClasses({ fg: 'red' })).toBe('text-red-600 dark:text-red-400')
    expect(styleClasses({ fg: 'green' })).toBe('text-green-600 dark:text-green-400')
  })

  it('lets a background style win over the foreground colour', () => {
    const classes = styleClasses({ fg: 'white', bg: 'red' })
    expect(classes).toContain('bg-red-500/10')
    expect(classes).toContain('inline-block px-1.5 py-0.5 rounded')
    expect(classes).not.toContain('text-white')
  })

  it('adds font classes for options', () => {
    expect(styleClasses({ options: ['bold'] })).toBe('font-bold')
    expect(styleClasses({ options: ['underscore'] })).toBe('underline')
    expect(styleClasses({ fg: 'red', options: ['bold', 'underscore'] }))
      .toBe('text-red-600 dark:text-red-400 font-bold underline')
  })

  it('ignores unknown colour names', () => {
    expect(styleClasses({ fg: 'chartreuse' })).toBe('')
  })
})
