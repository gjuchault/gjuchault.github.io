<template>
  <main class="gj-posts">
    <gj-post-card
      v-for="post in posts"
      :post="post"
      :key="post.title"></gj-post-card>
  </main>
</template>

<script>
import PostCard from './PostCard.vue'

import posts from '../posts.json'

export default {
  components: {
    'gj-post-card': PostCard
  },

  data() {
    return {
      posts
    }
  }
}
</script>

<style>
.gj-posts {
  padding: 0 15px;
}
</style>
