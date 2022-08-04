<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
body {
  @apply bg-gray-100 antialiased;
}

html.dark body {
  @apply bg-gray-900;
}

#carbonads * {
  margin: initial;
  padding: initial;
  text-align: center;
}

#carbonads {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
  Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', Helvetica, Arial,
  sans-serif;
  display: inline-block;
  font-size: 14px;
  text-shadow: 0 1px hsla(0, 0%, 100%, .8);
}

#carbonads a,
#carbonads a:hover {
  color: #444;
  text-decoration: none;
}

#carbonads > span {
  display: grid;
  background-color: hsl(240, 4%, 98%);
  max-width: 250px;
  padding: 1em;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow:
      0 0 1px hsl(0deg 0% 0% / 0.075),
      0 0 2px hsl(0deg 0% 0% / 0.075),
      0 0 4px hsl(0deg 0% 0% / 0.075),
      0 0 8px hsl(0deg 0% 0% / 0.075),
      0 0 16px hsl(0deg 0% 0% / 0.075)
    ;
}

#carbonads .carbon-wrap {
  display: grid;
  row-gap: 1em;
}
#carbonads .carbon-text {
  font-size: 1em;
  margin-bottom: .5em;
}

#carbonads .carbon-poweredby {
  opacity: .5;
  font-size: .725em;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: .05ch
}
</style>
