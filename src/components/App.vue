<template>
  <div id="app">
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

<style lang="sass">
@import '../../node_modules/normalize.css';
@import '../assets/fonts/fonts.css';
@import '../assets/icons/style.css';

*, *:after, *:before {
  box-sizing: border-box;
}

html, body, #app {
  font-family: 'SourceSansPro-Regular';
  height: 100%;
  width: 100%;
  overflow: hidden;
}

body {
  font-family: Helvetica, sans-serif;
  margin: 0;
}

#app > :last-child {
  transition: opacity .15s ease;
}

main {
  padding: 15px;
}

h1, h2, h3, h4, h5, h6, .sourcesans {
  font-family: 'SourceSansPro-ExtraLight', sans-serif;
  font-weight: 300;
}

</style>
