<template>
  <div class="articles">
    <div class="articles__article" v-for="article in articles">
      <Card>
        <div class="articles__article__title">
          <h2>{{ article.title }} <small>— {{ article.date }}</small></h2>
        </div>
        <div class="articles__article__excerpt lora" v-html="article.excerpt"></div>
        <div class="card__footer">
          <AppButton icon="read" :light="false" @click="goTo(project)">Read article ({{ article.words }} words)</AppButton>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card        from './Card.vue';
import Button      from './Button.vue';
import * as fm     from 'front-matter';
import * as marked from 'marked';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const articlesDirectory = require.context('../../data/posts', true, /\.md$/);
const articles          = articlesDirectory.keys()
  .map(fileName => {
    return {
      fileName,
      body: articlesDirectory(fileName)
    };
  })
  .map(article => {
    const date          = new Date(article.fileName.slice(2, 12));
    const parsedArticle = fm(article.body);
    const body          = marked(parsedArticle.body);

    const month = MONTHS[date.getMonth()];

    return {
      body      : body,
      title     : parsedArticle.attributes.title,
      categories: parsedArticle.attributes.categories,
      date      : `${month} ${date.getDate()}, ${date.getFullYear()}`,
      excerpt   : body.split('\n').shift(),
      // Thanks to https://github.com/RadLikeWhoa/Countable
      words     : body.trim().replace(/['";:,.?¿\-!¡]+/g, '').match(/\S+/g).length
    };
  })

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
  }
}
</script>

<style lang="sass">
@import '../main.scss';

.articles__article {
  margin: 0 auto;
  max-width: 1024px;

  &:not(:first-child) {
    margin-top: 20px;
  }
}

.articles__article__title {
  padding: 15px 15px 0 15px;

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
