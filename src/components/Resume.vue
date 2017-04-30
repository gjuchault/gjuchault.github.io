<template>
  <main class="gj-resume">
    <embed class="gj-resume__viewer" :src="cv" type="application/pdf">
  </main>
</template>

<style>
.gj-resume {
  height: calc(100% - 145px);
  width: 100%;
}

.gj-resume__viewer {
  height: 100%;
  width: 100%;
}
</style>

<script>
import cvs from '../resumes.json';

export default {
  data() {
    return {
      cv: cvs[0]
    };
  },
  mounted() {
    this.$el.parentNode.style.opacity = 0;
    this.$el.parentNode.offsetWidth; // reflow
    this.$el.parentNode.style.opacity = 1;
  }
}
</script>
