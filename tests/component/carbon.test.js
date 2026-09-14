// @vitest-environment happy-dom
import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, expect, it, vi } from 'vitest'
import Carbon from '~/components/Carbon.vue'

let observers
let wrappers
beforeEach(() => {
  observers = []
  wrappers = []
  window.happyDOM.settings.handleDisabledFileLoadingAsSuccess = true
  vi.stubGlobal('IntersectionObserver', class {
    constructor(callback) {
      this.callback = callback
      this.observe = vi.fn()
      this.disconnect = vi.fn()
      observers.push(this)
    }
  })
  vi.stubGlobal('ResizeObserver', class {
    observe() {}
    disconnect() {}
  })
})
afterEach(() => {
  wrappers.forEach(wrapper => wrapper.unmount())
  vi.unstubAllGlobals()
})

function placement() {
  const wrapper = mount(Carbon, { attachTo: document.body })
  wrappers.push(wrapper)
  return wrapper
}

it('defers loading and loads only once when a placement becomes visible', () => {
  const wrapper = placement()
  expect(wrapper.find('script').exists()).toBe(false)
  const observer = observers[0]
  observer.callback([{ isIntersecting: true }])
  observer.callback([{ isIntersecting: true }])
  const frame = wrapper.get('iframe').element
  expect(frame.contentDocument.querySelectorAll('#_carbonads_js')).toHaveLength(1)
})

it('isolates simultaneous Carbon loaders and their output', () => {
  const first = placement()
  const second = placement()
  observers.forEach(observer => observer.callback([{ isIntersecting: true }]))
  const documents = [first, second].map(wrapper => wrapper.get('iframe').element.contentDocument)
  for (const doc of documents) {
    const script = doc.getElementById('_carbonads_js')
    const ad = doc.createElement('div')
    ad.id = 'carbonads'
    script.after(ad)
  }
  expect(documents[0]).not.toBe(documents[1])
  documents.forEach(doc => expect(doc.querySelectorAll('#carbonads')).toHaveLength(1))
  expect(document.querySelector('#_carbonads_js')).toBeNull()
})

it('cleans up the loader and ignores visibility callbacks after unmount', () => {
  const wrapper = placement()
  const observer = observers[0]
  observer.callback([{ isIntersecting: true }])
  const script = wrapper.get('iframe').element.contentDocument.getElementById('_carbonads_js')
  wrapper.unmount()
  wrappers = []
  expect(script.onload).toBeNull()
  expect(script.onerror).toBeNull()
  expect(script.isConnected).toBe(false)
  expect(observer.disconnect).toHaveBeenCalled()
  expect(() => observer.callback([{ isIntersecting: true }])).not.toThrow()
})
