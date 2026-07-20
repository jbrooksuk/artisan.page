// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import Search from '~/components/Search.vue'

const mountSearch = (props = {}, options = {}) =>
  mount(Search, {
    props: { modelValue: '', ...props },
    global: {
      stubs: {
        ClientOnly: { template: '<div><slot /></div>' },
      },
    },
    ...options,
  })

describe('Search', () => {
  it('shows the bound value in the input', () => {
    const wrapper = mountSearch({ modelValue: 'migrate' })
    expect(wrapper.get('input').element.value).toBe('migrate')
  })

  it('emits update:modelValue when the user types', async () => {
    const wrapper = mountSearch()
    await wrapper.get('input').setValue('horizon')
    expect(wrapper.emitted('update:modelValue')).toEqual([['horizon']])
  })

  it('shows the keyboard shortcut hint for the platform', () => {
    // happy-dom's default user agent is not macOS.
    expect(mountSearch().get('kbd').text()).toBe('Ctrl+K')
  })

  it('focuses the input via the exposed focus method', () => {
    const wrapper = mountSearch({}, { attachTo: document.body })
    wrapper.vm.focus()
    expect(document.activeElement).toBe(wrapper.get('input').element)
  })
})
