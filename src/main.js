import Vue       from 'vue';
import VueRouter from 'vue-router';
import App       from './components/App.vue';

// Routing
Vue.use(VueRouter);

import Projects from './components/Projects.vue';
import Articles from './components/Articles.vue';
import Article  from './components/Article.vue';
import About    from './components/About.vue';

const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path       : '/',
      component  : Projects,
      beforeEnter
    },
    {
      path       : '/articles',
      component  : Articles,
      beforeEnter
    },
    {
      path     : '/articles/:articleTitle',
      name     : 'article',
      component: Article,
      beforeEnter
    },
    {
      path: '/about',
      component: About,
      beforeEnter
    },
    {
      path: '*',
      component  : Projects,
      beforeEnter
    }
  ]
});

let initalCallBefore = true;
function beforeEnter(to, redirect, next) {
  if (initalCallBefore) {
    initalCallBefore = false;
    return next();
  }

  const actualPage = document.querySelector('#app > :last-child:not(header)');

  if (actualPage) {
    actualPage.style.opacity = '0';
  }

  setTimeout(() => {
    next();
  }, 150);
}

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});
