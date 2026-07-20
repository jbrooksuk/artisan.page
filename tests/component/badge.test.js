// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Badge from '~/components/Badge.vue'

describe('Badge', () => {
  it('renders Optional by default', () => {
    const wrapper = mount(Badge)
    expect(wrapper.text()).toBe('Optional')
  })

  it('renders Required when required', () => {
    const wrapper = mount(Badge, { props: { required: true } })
    expect(wrapper.text()).toBe('Required')
    expect(wrapper.classes()).toContain('text-artisan-accent')
  })

  it('renders Deprecated over Required', () => {
    const wrapper = mount(Badge, { props: { required: true, deprecated: true } })
    expect(wrapper.text()).toBe('Deprecated')
  })
})
