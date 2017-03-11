<template>
  <div id="app" class="app">
    <AppHeader></AppHeader>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
  components: {
    AppHeader: Header
  }
}
</script>

<style lang="scss">
@import '../../node_modules/normalize.css';
@import '../../node_modules/highlight.js/styles/agate.css';
@import '../assets/fonts/fonts.css';
@import '../assets/icons/style.css';

@import '../main.scss';

*, *:after, *:before {
  box-sizing: border-box;
}

html, body, #app {
  font-family: $sourceSansPro;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
}

body {
  color: #424242;
  font-family: Helvetica, sans-serif;
  margin: 0;
}

#app > :last-child {
  transition: opacity .15s ease;
}

main {
  padding: $mainPadding;
}

h1, h2, h3, h4, h5, h6, .sourcesans {
  font-family: $sourceSansPro;
  font-weight: 200;
}

.lora {
  font-family: $lora;
  line-height: 1.15 !important;
}

hr {
  border: 0;

  border-top: 1px solid #ccc;
  display: block;
  height: 1px;
  margin: 0;
  padding: 0;
}

</style>
