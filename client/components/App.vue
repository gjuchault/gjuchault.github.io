<template>
  <div id="app" :class="{ webp }">
    <g-header></g-header>
    <g-projects></g-projects>
    <g-footer></g-footer>
  </div>
</template>

<script>
import gHeader from './Header'
import gProjects from './Projects'
import gFooter from './Footer'

export default {
  components: {
    gHeader,
    gProjects,
    gFooter
  },

  data() {
    return {
      webp: false
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  color: #222;
  font-family: Roboto, sans-serif;
  font-size: 16px;
}
</style>
