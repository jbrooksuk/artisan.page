export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('robots:robots-txt', (ctx) => {
    ctx.robotsTxt = ctx.robotsTxt.replace(
      /^User-agent: \*$/m,
      'User-agent: *\nContent-Signal: ai-train=yes, search=yes, ai-input=yes',
    )
  })
})
