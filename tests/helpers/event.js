// Build a fake h3 event compatible with the globals in tests/setup/nitro-globals.js.
export function makeEvent({ params = {}, path = '/', headers = {}, method = 'GET' } = {}) {
  const normalized = {}
  for (const [name, value] of Object.entries(headers)) {
    normalized[name.toLowerCase()] = value
  }

  return {
    method,
    url: new URL(path, 'https://artisan.page'),
    headers: normalized,
    responseHeaders: {},
    context: { params },
  }
}
