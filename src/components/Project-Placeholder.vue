<template>
  <div class="gj-placeholder-wrapper">
    <div class="gj-placeholder gj-card gj-card-hoverable">
      <div class="gj-placeholder__title">
        <h2 :style="headerStyle">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h2>
      </div>
      <div class="gj-placeholder__info">
        <div class="gj-placeholder__info__tags">
          <gj-tag>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</gj-tag>
        </div>
        <p class="gj-placeholder__info__description">
          <span class="gj-placeholder__info__description__line">&nbsp;</span>
          <span class="gj-placeholder__info__description__line">&nbsp;</span>
          <span class="gj-placeholder__info__description__line">&nbsp;</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Tag from './Tag.vue'

export default {
  components: {
    'gj-tag': Tag
  },

  computed: {
    headerStyle() {
      return {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        color: '#fff'
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
.gj-placeholder-wrapper {
  margin-right: calc(30px / 2);
  padding-bottom: 15px;
  width: calc((100% / 3) - (30px / 3));
}

.gj-placeholder-wrapper:nth-child(3n) {
  margin-right: 0;
}

.gj-placeholder {
  cursor: pointer;
  min-height: 340px;
  position: relative;
  width: 100%;
}

.gj-placeholder:hover > .gj-placeholder__open {
  opacity: 1;
  transition: opacity .2s ease-in;
}

.gj-placeholder__title {
  align-items: flex-end;
  background: #eee;
  border-bottom: 1px solid #dedede;
  display: flex;
  height: 150px;
  padding: 24px;
}

.gj-placeholder__title > h2 {
  font-size: 32px;
  margin: 0;
  padding: 5px 20px;
}

.gj-placeholder__info {
  padding: 15px;
}

.gj-placeholder__info__tags > :first-child {
  margin-left: 0;
}

.gj-placeholder__info__description {
  color: #444;
  margin-bottom: 0;
  text-align: justify;
}

.gj-placeholder__info__description__line {
  background-color: #ddd;
  display: block;
  margin-bottom: 5px;
}

.gj-placeholder__info__description__line:last-child {
  margin-bottom: 0;
  width: 50%;
}

@media (min-width: 1250px) {
  .gj-placeholder-wrapper {
    margin-right: calc(30px / 3);
    width: calc((100% / 4) - (30px / 4));
  }

  .gj-placeholder-wrapper:nth-child(3n) {
    margin-right: calc(30px / 3);
  }

  .gj-placeholder-wrapper:nth-child(4n) {
    margin-right: 0;
  }
}

@media (max-width: 1024px) {
  .gj-placeholder-wrapper {
    margin-right: calc(15px / 1);
    width: calc((100% / 2) - (15px / 2));
  }

  .gj-placeholder-wrapper:nth-child(3n) {
    margin-right: calc(15px / 1);
  }

  .gj-placeholder-wrapper:nth-child(2n) {
    margin-right: 0;
  }
}

@media (max-width: 768px) {
  .gj-placeholder-wrapper {
    margin-right: 0;
    width: 100%;
  }

  .gj-placeholder-wrapper:nth-child(3n) {
    margin-right: 0;
  }

  .gj-placeholder-wrapper:nth-child(2n) {
    margin-right: 0;
  }
}
</style>
