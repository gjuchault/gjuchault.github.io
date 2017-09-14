<template>
  <div class="project">
    <div class="project__image" :style="backgroundImage" @click="zoom">
      <g-open :link="project.url"></g-open>
    </div>
    <h3>{{ project.title }}</h3>
    <div class="project__tags">
      <g-tag v-for="(tag, i) in project.tags" :key="i">{{ tag }}</g-tag>
    </div>
    <p class="project__description">
      {{ project.desc }}
    </p>

    <img
      ref="fullscreen"
      :src="currentImageZoomed"
      :class="{ fullscreen: currentImageZoomed }"
      v-show="currentImageZoomed"
      @click="zoomOut"
      @transitionend="clean" />
    <div ref="backdrop" class="backdrop" @click="zoomOut"></div>
  </div>
</template>

<script>
import webp from '../lib/webp'
import gOpen from './Open'
import gTag from './Tag'

const isProd = process.env.NODE_ENV === 'production'

export default {
  props: [ 'project' ],

  data() {
    return {
      currentImageZoomed: null,
      fullscreenEnter: false
    }
  },

  components: {
    gOpen,
    gTag
  },

  computed: {
    backgroundImage() {
      const picture = isProd ? `/static/${this.project.picture.src}` : this.project.picture.src

      let imgSet = [ ]

      for (let i = 0; i < this.project.picture.count; i += 1) {
        let setPicture = isProd ? `/static/${this.project.picture.src}` : this.project.picture.src
        let scale = '1x'

        if (i > 0) {
          setPicture = setPicture.replace('.jpg', `@x${i + 1}.jpg`)
          scale = `${i + 1}x`
        }

        imgSet.push(`url(${setPicture}) ${scale}`)
      }

      let styles = [
        `background-image: url(${picture})`,
        `background-image: image-set(${imgSet.join(', ')})`,
        `background-image: -webkit-image-set(${imgSet.join(', ')})`
      ]

      return styles.join('; ')
    }
  },

  mounted() {
    this.$fullscreen = this.$refs.fullscreen
    this.$backdrop = this.$refs.backdrop
  },

  methods: {
    zoom() {
      this.currentImageZoomed = this.project.picture

      this.$fullscreen.classList.add('fullscreen')

      setTimeout(() => {
        this.$fullscreen.style.transition = '.2s opacity ease'
        this.$backdrop.style.transition = '.2s opacity ease'

        setTimeout(() => {
          this.$fullscreen.style.opacity = 1
          this.$backdrop.style.opacity = 1
        })
      })
    },

    zoomOut() {
      this.isHiding = true
      this.$fullscreen.style.opacity = 0
      this.$backdrop.style.opacity = 0
    },

    clean() {
      if (this.isHiding) {
        this.isHiding = false

        this.$fullscreen.removeAttribute('style')
        this.$backdrop.removeAttribute('style')
        this.currentImageZoomed = null
      }
    }
  }
}
</script>

<style scoped>
.project {
  width: calc(100vw - 40px);
  margin: 40px 20px 0 20px;

  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 3px 1px -2px rgba(0, 0, 0, 0.2),
              0 1px 5px 0 rgba(0, 0, 0, 0.12);

  &:last-child {
    margin-bottom: 40px;
  }
}

.project__image {
  height: 150px;

  align-items: flex-end;
  display: flex;
  position: relative;

  background-size: cover;
  cursor: zoom-in;
  padding: 24px;
}

.project > h3 {
  margin: 2rem 2rem 1rem 2rem;

  font-size: 2rem;
  font-weight: 200;
}

.project__tags {
  margin: 0 2rem 2rem 2rem;
}

.project__description {
  margin: 0 2rem 2rem 2rem;
}

.fullscreen {
  position: fixed;
  top: 50%;
  left: 50%;
  max-width: calc(100vw - 10px);
  max-height: calc(100vh - 10px);

  cursor: zoom-out;
  opacity: 0;
  transform: translate(-50%, -50%);
  z-index: 5;
}

.fullscreen + .backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  cursor: zoom-out;
  background-color: rgba(0, 0, 0, 0.75);
  opacity: 0;
  z-index: 1;
}

@media (min-width: 650px) {
  .project {
    width: 600px;
  }

  .fullscreen {
    max-width: calc(95vw);
    max-height: calc(95vh);
  }
}
</style>
