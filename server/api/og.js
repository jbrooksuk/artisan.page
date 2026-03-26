import { Resvg } from '@resvg/resvg-js'

export default defineEventHandler((event) => {
  const query = getQuery(event)
  const command = query.command || 'artisan'
  const description = query.description || 'The Laravel Artisan Cheatsheet'
  const version = query.version || ''

  const versionText = version ? `Laravel ${version}` : ''

  const svg = `
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#BB2926" />
      <stop offset="100%" stop-color="#F26763" />
    </linearGradient>
    <linearGradient id="logo-a" x1="56" y1="58" x2="86" y2="58" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#7a1b18" />
      <stop offset="1" stop-color="#bb2926" />
    </linearGradient>
    <linearGradient id="logo-b" x1="28" y1="83" x2="86" y2="83" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#7a1b18" />
      <stop offset="1" stop-color="#471413" />
    </linearGradient>
    <linearGradient id="logo-c" x1="-13" y1="119" x2="42" y2="63" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#ef3931" />
      <stop offset="1" stop-color="#bb2926" />
    </linearGradient>
    <linearGradient id="logo-d" x1="50" y1="37" x2="35" y2="12" xlink:href="#logo-c" />
    <linearGradient id="logo-e" x1="-14" y1="75" x2="28" y2="50" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#f2706d" />
      <stop offset="0.03" stop-color="#f26c69" />
      <stop offset="0.25" stop-color="#f15650" />
      <stop offset="0.47" stop-color="#f0463f" />
      <stop offset="0.71" stop-color="#ef3c34" />
      <stop offset="1" stop-color="#ef3931" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#161616" />

  <!-- Accent bar at top -->
  <rect width="1200" height="4" fill="url(#accent)" />

  <!-- Logo -->
  <g transform="translate(80, 52) scale(0.32)">
    <path fill="url(#logo-a)" d="M86,116.79,57,100.18V0L86,16.61Z" />
    <path fill="url(#logo-b)" d="M57,100.18,28.48,83,57,66.42,86,83Z" />
    <path fill="url(#logo-c)" d="M28.48,150,0,133.39V33.21L28.48,49.82V150" />
    <path fill="url(#logo-d)" d="M57,0,86,16.61,28.48,49.82,0,33.21Z" />
    <path fill="url(#logo-e)" d="M28.48,83,0,100.74V33.21L28.48,49.82Z" />
    <path fill="#ef3931" d="M57,0,86,16.61,57.16,33.09Z" />
  </g>

  <!-- Site name + tagline -->
  <text x="114" y="80" font-family="sans-serif" font-size="24" fill="#ffffff" font-weight="700">Artisan.page</text>
  <text x="114" y="100" font-family="sans-serif" font-size="13" fill="#6f6f6f">The Laravel Artisan Cheatsheet</text>

  <!-- Command name -->
  <text x="80" y="185" font-family="monospace" font-size="40" fill="#d3403e" font-weight="700">${escapeXml(command)}</text>

  <!-- Description -->
  <text x="80" y="225" font-family="sans-serif" font-size="20" fill="#999999">${escapeXml(truncate(description, 90))}</text>

  <!-- Terminal block -->
  <rect x="80" y="270" width="1040" height="110" rx="10" fill="#1e1e1e" />
  <text x="100" y="298" font-family="sans-serif" font-size="12" fill="#666666">Terminal</text>
  <text x="100" y="342" font-family="monospace" font-size="22">
    <tspan fill="#e8514f">php artisan</tspan><tspan fill="#74d4ff"> ${escapeXml(command)}</tspan>
  </text>

  <!-- Version text -->
  ${versionText ? `
  <text x="80" y="440" font-family="sans-serif" font-size="16" fill="#d3403e" font-weight="500">${escapeXml(versionText)}</text>
  ` : ''}

  <!-- URL -->
  <text x="1110" y="580" font-family="sans-serif" font-size="14" fill="#444444" text-anchor="end">artisan.page</text>
</svg>`

  const resvg = new Resvg(svg, {
    fitTo: {
      mode: 'width',
      value: 1200,
    },
  })

  const pngData = resvg.render()
  const pngBuffer = pngData.asPng()

  setResponseHeaders(event, {
    'Content-Type': 'image/png',
    'Cache-Control': 'public, max-age=86400, s-maxage=86400',
  })

  return pngBuffer
})

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function truncate(str, maxLen) {
  if (str.length <= maxLen) return str
  return str.slice(0, maxLen - 3) + '...'
}
