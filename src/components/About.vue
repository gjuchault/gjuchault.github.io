<style lang="sass" scoped>
@import '../main.scss';

h1 {
  margin-top: 0;
}

p {
  text-align: justify;
}

.button-wrapper {
  display: inline-block;

  button {
    width: 100%;
  }

  &:not(:last-of-type) {
    margin-right: 2.5px;
  }
}

@media screen and (max-width: 550px) {
  .button-wrapper {
    margin-right: 0;
    width: 100% !important;

    &:not(:last-of-type) {
      margin-bottom: 2.5px;
    }
  }
}
</style>

<template>
  <Card>
    <h1>About</h1>
    <p v-for="line in cv.pretext" v-html="line">
    </p>
    <span v-for="cv in cv.cvs" :style="buttonSize" class="button-wrapper">
      <AppButton :colored="true">
        Download resume ({{ cv[0] }})
      </AppButton>
    </span>
    <p v-for="line in cv.posttext" v-html="line">
    </p>
  </Card>
</template>

<script>
import Button from './Button.vue';
import Card   from './Card.vue';

import cv from '../../data/cv.json';

export default {
  components: {
    AppButton: Button,
    Card
  },

  data() {
    return {
      cv,
      buttonSize: {
        width: `calc(${100 / cv.cvs.length}% - 2.5px)`
      }
    };
  },

  mounted() {
    this.$el.parentNode.style.opacity = 0;
    this.$el.parentNode.offsetWidth; // reflow
    this.$el.parentNode.style.opacity = 1;
  }
}
</script>
