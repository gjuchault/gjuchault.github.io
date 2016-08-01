<template>
  <div>Articles.</div>
</template>

<script>
export default {
  mounted() {
    this.$el.style.opacity = 0;
    this.$el.offsetWidth; // reflow
    this.$el.style.opacity = 1;
  }
}
</script>
