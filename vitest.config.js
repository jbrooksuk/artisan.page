import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'

const root = fileURLToPath(new URL('.', import.meta.url))

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '~': root,
      '@': root,
    },
  },
  test: {
    environment: 'node',
    setupFiles: ['./tests/setup/nitro-globals.js'],
    include: ['tests/**/*.test.js'],
  },
})
