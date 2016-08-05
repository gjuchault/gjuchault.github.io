<template>
  <div>
    Article. Name: {{ $route.params.articleTitle }}
  </div>
</template>

<script>
export default {
  mounted() {
    this.$el.parentNode.style.opacity = 0;
    this.$el.parentNode.offsetWidth; // reflow
    this.$el.parentNode.style.opacity = 1;
  }
}
</script>
