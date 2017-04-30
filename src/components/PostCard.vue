<template>
  <div class="gj-post-card gj-card gj-card-hoverable">
    <h2 class="gj-post-card__title">
      <router-link :to="link">
        {{ post.title }}
      </router-link>
    </h2>
    <time class="gj-post-card__time">{{ post.date }}</time>
    <div class="gj-post-card__excerpt" v-html="post.excerpt"></div>
    <router-link class="gj-post-card__link" :to="link">Read more...</router-link>
  </div>
</template>

<script>
export default {
  props: [ 'post' ],

  computed: {
    link() {
      return `./${this.post.slug}/`
    }
  }
}
</script>

<style>
.gj-post-card {
  margin: 20px auto 0;
  max-width: 768px;
  padding: 15px;
}

.gj-post-card__title {
  cursor: pointer;
  font-size: 32px;
  margin: 0;
}

.gj-post-card__title > a {
  color: #222;
  text-decoration: none;
}

.gj-post-card__time {
  color: #666;
  display: inline-block;
  margin: 10px 0;
}

.gj-post-card__excerpt {
  font-size: 18px;
  color: #555;
  margin: 15px 0;
  text-align: justify;
  width: 90%;
}
</style>
