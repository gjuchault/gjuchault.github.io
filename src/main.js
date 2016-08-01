import Vue       from 'vue';
import VueRouter from 'vue-router';
import App       from './components/App.vue';

// Routing
Vue.use(VueRouter);

import Projects from './components/Projects.vue';
import Articles from './components/Articles.vue';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
        path       : '/',
        component  : Projects,
        beforeEnter: beforeEnter
    },
    {
        path       : '/articles',
        component  : Articles,
        beforeEnter: beforeEnter
    }
  ]
});

let initalCallBefore = true;
function beforeEnter(to, redirect, next) {
  if (initalCallBefore) {
    initalCallBefore = false;
    return next();
  }

  const actualPage = document.querySelector('#app > :last-child');

  actualPage.style.opacity = '0';

  setTimeout(() => {
    next();
  }, 150);
}

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
