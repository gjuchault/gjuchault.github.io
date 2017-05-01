import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Projects from './components/Projects.vue'
import Posts from './components/Posts.vue'
import Resume from './components/Resume.vue'
import Post from './components/Post.vue'

const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '', component: Projects, meta: { index: 0 } },
    { path: '/posts', component: Posts, meta: { index: 1 } },
    { path: '/:article', component: Post, meta: { hideMenu: true } }
  ]
})

export default router
