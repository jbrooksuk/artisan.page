// @vitest-environment happy-dom
import { shallowMount } from '@vue/test-utils'
import { nextTick, reactive } from 'vue'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import ArtisanBrowser from '~/components/ArtisanBrowser.vue'

class IntersectionObserver {
  observe() {}
  disconnect() {}
}

const mountBrowser = (query = {}, hash = '') => {
  const route = reactive({ query, hash })
  const router = {
    replace: vi.fn(({ query: nextQuery }) => {
      route.query = nextQuery
      return Promise.resolve()
    }),
  }

  const wrapper = shallowMount(ArtisanBrowser, {
    props: { version: '12.x' },
    global: {
      mocks: {
        $route: route,
        $router: router,
      },
    },
  })

  return { route, router, wrapper }
}

describe('ArtisanBrowser search query', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', IntersectionObserver)
  })

  it('restores the search from q when the page loads', () => {
    const { wrapper } = mountBrowser({ q: 'migrate' })

    expect(wrapper.vm.filter).toBe('migrate')
  })

  it('updates q while preserving other query parameters', () => {
    const { router, wrapper } = mountBrowser({ ref: 'docs' }, '#cache-clear')

    wrapper.vm.filterResults(' cache ')

    expect(router.replace).toHaveBeenCalledWith({
      query: { ref: 'docs', q: 'cache' },
      hash: '#cache-clear',
    })
  })

  it('removes q when the search is cleared', () => {
    const { router, wrapper } = mountBrowser({ q: 'cache', ref: 'docs' })

    wrapper.vm.filterResults('')

    expect(router.replace).toHaveBeenCalledWith({
      query: { ref: 'docs' },
      hash: '',
    })
  })

  it('tracks q changes from browser navigation', async () => {
    const { route, wrapper } = mountBrowser({ q: 'cache' })

    route.query.q = 'route'
    await nextTick()

    expect(wrapper.vm.filter).toBe('route')
  })
})
