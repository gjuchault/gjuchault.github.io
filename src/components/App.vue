<template>
  <div id="app">
    <AppHeader></AppHeader>
    <router-view></router-view>
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

<style>
@import '../../node_modules/normalize.css';

body {
  font-family: Helvetica, sans-serif;
  margin: 0;
}

#app > :last-child {
  transition: opacity .15s ease;
}
</style>
