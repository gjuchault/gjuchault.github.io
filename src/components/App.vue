<template>
  <div id="app">
    <gj-header></gj-header>
    <transition name="gj-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import GJHeader from './Header.vue'
import 'highlight.js/styles/agate.css'

export default {
  name: 'app',

  components: {
    'gj-header': GJHeader
  }
}
</script>

<style>
*, *:after, *:before {
  box-sizing: border-box;
}


html {
  height: 100%;
}

body {
  font-family: Lato, sans-serif;
  height: 100%;
  margin: 0;
  overflow-y: auto;
}

h1, h2, h3, h4, h5, h6 {
  font-weight: 200;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.gj-card {
  border-radius: 2px;
  border: 1px solid rgba(0,0,0,.12);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14),
              0 3px 1px -2px rgba(0, 0, 0, .2),
              0 1px 5px 0 rgba(0, 0, 0, .12);
}

.gj-card-hoverable {
  transition: box-shadow .2s ease-out;
}

.gj-card-hoverable:hover {
  box-shadow: 0 4px 5px 0 rgba(0, 0, 0, .14),
              0 1px 10px 0 rgba(0, 0, 0, .12),
              0 2px 4px -1px rgba(0, 0, 0, .2);
  transition: box-shadow .2s ease-in;
}

/* Fade transition */
.gj-fade-enter-active, .gj-fade-leave-active {
  transition-property: opacity;
  transition-duration: .25s;
}

.gj-fade-enter-active {
  transition-delay: .25s;
}

.gj-fade-enter, .gj-fade-leave-active {
  opacity: 0
}
</style>
