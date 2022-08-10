<template>
  <div>
    <script
      async
      type="text/javascript"
      src="//cdn.carbonads.com/carbon.js?serve=CEAIP27N&placement=artisanpage"
      id="_carbonads_js"
    ></script>
  </div>
</template>

<style>
#carbonads {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #f7f8fb;
  z-index: 100;
  box-shadow: 0 0 1px hsla(0, 0%, 0%, 0.25);
  padding: 0.625em;
  max-width: 130px;
  box-sizing: content-box;
}

#carbonads span {
  display: block;
}

#carbonads img {
  display: block;
  margin-bottom: 0.75em;
}

#carbonads .carbon-text {
  display: block;
  font-size: 0.75em;
  line-height: 1.4em;
  @apply text-gray-700;
}

#carbonads .carbon-poweredby {
  font-size: 0.5em;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1;
  @apply text-gray-600;
}

@media only screen and (min-width: 320px) and (max-width: 1239px) {
  #carbonads {
    position: relative;
    float: none;
    bottom: initial;
    right: initial;
    margin: 20px 0;
    max-width: 330px;
    padding: 1em;
  }

  #carbonads .carbon-wrap {
    display: flex;
    flex-direction: row;
  }

  #carbonads img {
    margin: 0 1em 0 0;
  }

  #carbonads .carbon-text {
    font-size: 0.825em;
    margin-bottom: 1em;
  }

  #carbonads .carbon-poweredby {
    position: absolute;
    left: 162px;
    bottom: 15px;
  }
}

@media only screen and (min-width: 320px) and (max-width: 429px) {
  #carbonads .carbon-wrap {
    flex-direction: column;
  }

  #carbonads img {
    margin: initial;
    margin: 0 0 0.5em 0;
  }

  #carbonads .carbon-text {
    margin-bottom: initial;
  }

  #carbonads .carbon-poweredby {
    position: initial;
    left: initial;
    right: initial;
  }
}

@media only print {
  #carbonads {
    display: none;
  }
}
</style>
