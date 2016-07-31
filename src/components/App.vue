<template>
  <div id="app">
    <AppHeader></AppHeader>
    <img src="../assets/logo.png">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import Header from './Header.vue';

export default {
  components: {
    AppHeader: Header
  },
  data() {
    return {
      msg: 'Hello Vue 2.0!'
    }
  }
}
</script>

<style>
@import '../../node_modules/normalize.css';

body {
  font-family: Helvetica, sans-serif;
  margin: 0;

}
</style>
