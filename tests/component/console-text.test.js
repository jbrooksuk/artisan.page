// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ConsoleText from '~/components/ConsoleText.vue'

describe('ConsoleText', () => {
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
