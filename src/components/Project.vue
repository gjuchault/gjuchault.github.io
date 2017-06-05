<template>
  <div class="gj-project-wrapper" @click="openProject">
    <div class="gj-project gj-card gj-card-hoverable">
      <div class="gj-project__open">
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAD9CzEMAAAAw0lEQVR4Ae3XMQrCQBCF4R+8S/AIFh5D03g9+0QPJpLYGYiNMIVsXjFvC2HftsP/gamkrc2+PSMT68b7TtwU8884qwGMrHWBqTIgDsq7sPgAnTcDkV9ygM73OUDnSQE6bwBE3gpE/k0PBkDkDYDIGwCZjynAkheAzp/BABjyApB5w0cW+QSg8gbgN38CH6DzBuAo8mlgxzXybiCIyFuBIA7gB/Qa8JfAi9XwZoq7W4Ah9wdEvQcdbBE35sSPM9BhXlvbB3gLRtCE0kGqAAAAAElFTkSuQmCC" height="32" width="32" alt="Open in new tab">
      </div>
      <div class="gj-project__title" :style="titleStyle">
        <h2 :style="headerStyle">{{ project.title }}</h2>
      </div>
      <div class="gj-project__info">
        <div class="gj-project__info__tags">
          <gj-tag
            v-for="tag in project.tags"
            :key="tag">{{ tag }}</gj-tag>
        </div>
        <p class="gj-project__info__description">{{ project.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from './Tag.vue'

export default {
  props: [ 'project' ],

  components: {
    'gj-tag': Tag
  },

  computed: {
    titleStyle() {
      return {
        background: `url(${this.project.picture}) center center / cover`
      }
    },

    headerStyle() {
      return {
        backgroundColor: this.project.background,
        color: this.project.color
      }
    }
  },

  methods: {
    openProject() {
      window.open(this.project.url)
    }
  }
}
</script>

<style>
.gj-project-wrapper {
  margin-right: calc(30px / 2);
  padding-bottom: 15px;
  width: calc((100% / 3) - (30px / 3));
}

.gj-project-wrapper:nth-child(3n) {
  margin-right: 0;
}

.gj-project {
  cursor: pointer;
  min-height: 340px;
  position: relative;
  width: 100%;
}

.gj-project:hover > .gj-project__open {
  opacity: 1;
  transition: opacity .2s ease-in;
}

.gj-project__open {
  align-items: center;
  background-color: rgba(255, 255, 255, .8);
  display: flex;
  height: 60px;
  justify-content: center;
  opacity: 0;
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity .2s ease-out;
  width: 60px;
}

.gj-project__title {
  align-items: flex-end;
  border-bottom: 1px solid #dedede;
  display: flex;
  height: 150px;
  padding: 24px;
}

.gj-project__title > h2 {
  font-size: 32px;
  margin: 0;
  padding: 5px 20px;
}

.gj-project__info {
  padding: 15px;
}

.gj-project__info__tags > :first-child {
  margin-left: 0;
}

.gj-project__info__description {
  color: #444;
  margin-bottom: 0;
  text-align: justify;
}

@media (min-width: 1250px) {
  .gj-project-wrapper {
    margin-right: calc(30px / 3);
    width: calc((100% / 4) - (30px / 4));
  }

  .gj-project-wrapper:nth-child(3n) {
    margin-right: calc(30px / 3);
  }

  .gj-project-wrapper:nth-child(4n) {
    margin-right: 0;
  }
}

@media (max-width: 1024px) {
  .gj-project-wrapper {
    margin-right: calc(15px / 1);
    width: calc((100% / 2) - (15px / 2));
  }

  .gj-project-wrapper:nth-child(3n) {
    margin-right: calc(15px / 1);
  }

  .gj-project-wrapper:nth-child(2n) {
    margin-right: 0;
  }
}



@media (max-width: 768px) {
  .gj-project-wrapper {
    margin-right: 0;
    width: 100%;
  }

  .gj-project-wrapper:nth-child(3n) {
    margin-right: 0;
  }

  .gj-project-wrapper:nth-child(2n) {
    margin-right: 0;
  }
}
</style>
