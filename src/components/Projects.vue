<template>
  <main class="gj-projects">
    <gj-project
      v-for="project in projects"
      :project="project"
      :key="project.title"></gj-project>
  </main>
</template>

<script>
import Project from './Project.vue'
import ProjectPlaceholder from './Project-Placeholder.vue'

import projects from '../../data/projects.json'

export default {
  components: {
    'gj-project': Project,
    'gj-project-placeholder': ProjectPlaceholder
  },

  data() {
    return {
      projects
    }
  }
}
</script>

<style>
.gj-projects {
  display: flex;
  flex-wrap: wrap;
  padding: 15px;
}
</style>
