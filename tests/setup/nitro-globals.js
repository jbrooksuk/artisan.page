// Nitro auto-imports h3 helpers into server routes and middleware. These tests
// import those files directly, so provide minimal equivalents on globalThis.
// Test events are plain objects created by tests/helpers/event.js.

globalThis.defineEventHandler = (handler) => handler
globalThis.defineSitemapEventHandler = (handler) => handler

globalThis.getRouterParam = (event, name) => event.context?.params?.[name]

globalThis.getRequestURL = (event) => event.url

globalThis.getHeader = (event, name) => event.headers?.[name.toLowerCase()]

globalThis.setHeader = (event, name, value) => {
  event.responseHeaders[name] = value
}

globalThis.createError = (input) => {
  const error = new Error(input.statusMessage || input.message)
  return Object.assign(error, input)
}
