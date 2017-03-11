<template>
  <div class="articles">
    <div class="articles__article" v-for="article in articles">
      <Card>
        <div class="articles__article__title">
          <h2>
            <a @click="linkToArticle(article)">
              {{ article.title }} <small>— <time>{{ article.date }}</time></small>
            </a>
          </h2>
        </div>
        <div class="articles__article__excerpt lora" v-html="article.excerpt"></div>
        <div class="card__footer">
          <AppButton @click="linkToArticle(article)" icon="read" :light="false">Read article ({{ article.words }} words)</AppButton>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card    from './Card.vue';
import Button  from './Button.vue';
import slugify from 'slugify';

import articles from '../articles.json';

export default {
  components: { Card, AppButton: Button },

  data() {
    return {
      articles
    };
  },

  mounted() {
    this.$el.parentNode.style.opacity = 0;
    this.$el.parentNode.offsetWidth; // reflow
    this.$el.parentNode.style.opacity = 1;

    setTimeout(() => {
      this.$root.$el.classList.remove('app--on-article')
    });
  },

  methods: {
    linkToArticle(article) {
      const articleSlug = slugify(article.title).toLowerCase();

      this.$router.push(`/articles/${articleSlug}`);
    }
  }
}
</script>

<style lang="scss">
@import '../main.scss';

.articles__article {
  margin: 0 auto;
  max-width: 1024px;

  &:not(:first-child) {
    margin-top: 20px;
  }
}

.articles__article__title {
  cursor: pointer;
  padding: 15px 15px 0 15px;

  a {
    color: initial;
    text-decoration: initial;
  }

  h2 {
    font-size: 32px;
    margin: 0;

    small {
      color: #666;
      font-size: 24px;
      vertical-align: middle;
    }
  }
}

.articles__article__excerpt {
  color: #555;
  font-size: 22px;
  line-height: 18px;
  padding: 15px;
  text-align: justify;
  width: 90%;
}

</style>
