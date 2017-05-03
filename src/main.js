import Vue from 'vue'
import 'typeface-lato'

import router from './router'

import App from './components/App.vue'

window.app = new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
