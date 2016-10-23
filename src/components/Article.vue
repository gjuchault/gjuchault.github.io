<template>
  <div class="article">
    <Card>
      <h1 class="article__title">{{ article.title }}</h1>
      <div class="article__time lora">
        <time>{{ article.date }}</time>
      </div>
      <hr/>
      <div class="article__body" v-html="article.body"></div>
    </Card>
  </div>
</template>

<script>
import slug     from 'slug';
import articles from '../allArticles';

import Button from './Button.vue';
import Card   from './Card.vue';

export default {
  components: { Card, AppButton: Button },

  data() {
    console.log(articles);
    const article = articles.find(art => {
      return slug(art.title, { lower: true }) === this.$route.params.articleTitle;
    });

    return {
      article
    };
  },

  mounted() {
    this.$el.parentNode.style.opacity = 0;
    this.$el.parentNode.offsetWidth; // reflow
    this.$el.parentNode.style.opacity = 1;

    setTimeout(() => {
      this.$root.$el.classList.add('app--on-article')
    });
  }
}
</script>

<style lang="sass">
.article {
  .app.app--on-article & {
    background-color: #fff;
    margin: 0 auto;
    max-width: 1200px;
    position: relative;
    top: -50px;
    width: 70%;
  }

  > .card {
    padding: 30px 56px;
  }

  .article__title {
    font-size: 48px;
    margin: 0 0 10px 0;
    text-align: center;
  }

  .article__time {
    text-align: center;

    > time {
      background-color: #fff;
      font-size: 18px;
      position: relative;
      z-index: 2;
    }
  }

  .article__time + hr {
    position: relative;
    top: -11px;
  }

  .article__body {
    margin-top: 35px;
  }

  .article__body p,
  .article__body li {
    font-family: 'Lora', serif;
    font-size: 17px;
    line-height: 28px;
    text-align: justify;
  }

  .article__body h2 {
    font-size: 32px;
  }

  .article__body img {
    max-width: 100%;
  }
}

@media (max-width: 800px) {
  .app.app--on-article .article {
    width: 100%;
  }
}
</style>
