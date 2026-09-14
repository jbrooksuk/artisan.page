// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ConsoleText from '~/components/ConsoleText.vue'

describe('ConsoleText', () => {
  it('renders backtick-delimited code with its original case', () => {
    const wrapper = mount(ConsoleText, { props: { text: 'Defaults to `scout.chunk.searchable`; use `--Force`.' } })
    expect(wrapper.findAll('code').map(code => code.text())).toEqual(['scout.chunk.searchable', '--Force'])
    expect(wrapper.text()).toBe('Defaults to scout.chunk.searchable; use --Force.')
    expect(wrapper.get('code').classes()).toContain('font-mono')
    expect(wrapper.get('code').classes()).not.toContain('uppercase')
  })

  it('keeps code literal alongside console formatting and unmatched backticks', () => {
    const wrapper = mount(ConsoleText, { props: { text: '<info>Use</info> `<info>literal</info>` then `unfinished' } })
    expect(wrapper.get('code').text()).toBe('<info>literal</info>')
    expect(wrapper.find('info').exists()).toBe(false)
    expect(wrapper.get('.text-green-600').text()).toBe('Use')
    expect(wrapper.text()).toBe('Use <info>literal</info> then `unfinished')
  })

  it('renders plain text without extra markup', () => {
    const wrapper = mount(ConsoleText, { props: { text: 'Run the migrations' } })
    expect(wrapper.text()).toBe('Run the migrations')
    expect(wrapper.findAll('span span')).toHaveLength(0)
  })

  it('renders styled segments for console tags', () => {
    const wrapper = mount(ConsoleText, { props: { text: 'Run <info>migrate</info> first' } })
    expect(wrapper.text()).toBe('Run migrate first')
    const styled = wrapper.findAll('span span')
    expect(styled).toHaveLength(1)
    expect(styled[0].text()).toBe('migrate')
    expect(styled[0].classes()).toContain('text-green-600')
  })

  it('renders nothing for an empty string', () => {
    const wrapper = mount(ConsoleText, { props: { text: '' } })
    expect(wrapper.text()).toBe('')
  })
})
