<template>
  <div>Projects.</div>
</template>

<script>
import cv from '../../data/cv.json';

export default {
  mounted() {
    this.$el.parentNode.style.opacity = 0;
    this.$el.parentNode.offsetWidth; // reflow
    this.$el.parentNode.style.opacity = 1;
  }
};
</script>
