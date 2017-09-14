<template>
  <main>
    <g-project
      v-for="(project, i) in projects"
      :key="i"
      :project="project"></g-project>
  </main>
</template>

<script>
import gProject from './Project'

import projects from '../assets/projects.json'

export default {
  components: {
    gProject
  },

  data() {
    return {
      projects
    }
  }
}
</script>

<style scoped>
main {
  min-height: 75vh;

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
