<template>
  <div class="open">
    <a target="_blank" rel="noopener" :href="link" @mouseenter="show" @mouseleave="hide" @transitionend="clean">
      <img :src="openInNewTabIcon" height="32" width="32" alt="Open in new tab">
      <span>Open in new tab</span>
    </a>
  </div>
</template>

<script>
import { icon as openInNewTabIcon } from '../assets/openInNewTabIcon'

export default {
  props: [ 'link' ],

  data() {
    return {
      openInNewTabIcon
    }
  },

  mounted() {
    this.$link = this.$el.children[0]
  },

  methods: {
    show() {
      this.$el.style.width = '189px'
      this.$link.style.transform = 'translateX(135px)'

      setTimeout(() => {
        this.$link.style.transition = '.2s transform ease-out'
        this.$link.style.transform = 'translateX(0)'
      })
    },

    hide() {
      this.isHiding = true
      this.$link.style.transform = 'translateX(135px)'
    },

    clean() {
      if (this.isHiding) {
        this.isHiding = false
        this.$el.removeAttribute('style')
        this.$link.removeAttribute('style')
      }
    }
  }
}
</script>

<style scoped>
.open {
  display: block;
  position: absolute;
  right: 10px;
  top: 10px;
  height: 54px;
  width: 54px;

  border-right: 1px solid rgba(255, 255, 255, 0.3);
  overflow: hidden;
}

.open--opened {
  width: 190px;
}

.open a {
  display: flex;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-right: 0;
  color: #fff;
  cursor: pointer;
  overflow: hidden;
  padding: 10px 0 10px 10px;
  text-decoration: none;
  white-space: nowrap;
}

.open--opened a {
  transform: translateX(0);
}

.open a span {
  margin: 0 1rem;
}

@supports (backdrop-filter: blur(5px)) {
  .open a {
    backdrop-filter: blur(5px);
  }
}
</style>
