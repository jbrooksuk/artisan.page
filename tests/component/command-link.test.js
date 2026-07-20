// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CommandLink from '~/components/CommandLink.vue'

const NuxtLinkStub = {
  props: ['to'],
  template: '<a :href="to"><slot /></a>',
}

const command = {
  name: 'migrate:fresh',
  description: 'Drop all tables and re-run <info>all</info> migrations',
}

const mountLink = (props = {}) =>
  mount(CommandLink, {
    props: { command, ...props },
    global: { stubs: { NuxtLink: NuxtLinkStub } },
  })

describe('CommandLink', () => {
  it('renders an anchor to the command slug when no href is given', () => {
    const wrapper = mountLink()
    const anchor = wrapper.get('a')
    expect(anchor.attributes('href')).toBe('#migratefresh')
    expect(anchor.text()).toBe('migrate:fresh')
  })

  it('strips console tags from the title attribute', () => {
    expect(mountLink().get('a').attributes('title'))
      .toBe('Drop all tables and re-run all migrations')
  })

  it('renders a NuxtLink when an href is given', () => {
    const wrapper = mountLink({ href: '/13.x/migratefresh' })
    expect(wrapper.get('a').attributes('href')).toBe('/13.x/migratefresh')
  })

  it('highlights the active command', () => {
    expect(mountLink({ active: true }).get('a').classes()).toContain('text-artisan-accent')
    expect(mountLink({ active: false }).get('a').classes()).not.toContain('text-artisan-accent')
  })
})
