<template>
  <div class="open">
    <a target="_blank" rel="noopener" :href="link" @click.stop>
      <img :src="openInNewTabIcon" height="28" width="28" alt="Open in new tab">
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

  background-color: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.4);
  border-radius: 50%;
  overflow: hidden;
}

.open a {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;

  color: #fff;
  cursor: pointer;
  overflow: hidden;
  text-decoration: none;
  white-space: nowrap;
}
</style>
