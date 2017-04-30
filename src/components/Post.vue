<template>
  <div class="gj-post gj-card">
    <h1 class="gj-post__title">{{ post.title }}</h1>
    <div class="gj-post__date">
      <time>{{ post.date }}</time>
    </div>
    <div class="gj-post__body" v-html="post.body"></div>
  </div>
</template>

<script>
import posts from '../posts.json'

export default {
  data() {
    const post = posts.find(post => post.slug === this.$route.params.article)

    return { post }
  }
}
</script>

<style>
.gj-post {
  background-color: #fdfdfd;
  margin: 0 auto;
  max-width: 1000px;
  padding: 30px 56px;
  position: relative;
  top: -50px;
  width: 70%;
}

.gj-post__title {
  text-align: center;
}

.gj-post__date {
  background-color: #fff;
  margin: 30px auto;
  position: relative;
  text-align: center;
}

.gj-post__date:before {
  background-color: #ddd;
  content: ' ';
  height: 1px;
  left: 10%;
  position: absolute;
  top: 50%;
  width: 40%;
}

.gj-post__date:after {
  background-color: #ddd;
  content: ' ';
  height: 1px;
  position: absolute;
  right: 10%;
  top: 50%;
  width: 40%;
}

.gj-post__date > time {
  background-color: #fff;
  padding: 0 10px;
  position: relative;
  z-index: 2;
}

.gj-post__body {
  text-align: justify;
}

.gj-post__body img {
  max-width: 100%;
}
</style>
