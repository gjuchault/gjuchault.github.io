<template>
  <header>
    <h1>Gabriel Juchault</h1>

    <div class="menu" draggable="true"
       :class="{ showIconRight: showIconRight, showIconLeft: showIconLeft }"
       @dragstart="startDragMenu"
       @mousemove="moveMenu"
       @mouseup="stopDragMenu"
       @mouseleave="stopDragMenu">
      <AppButton data-slug="projects" ref="tab0" @click="changeTab(0)">
        Projects
      </AppButton>
      <AppButton data-slug="articles" ref="tab1" @click="changeTab(1)">
        Articles
      </AppButton>
      <AppButton data-slug="about" ref="tab2" @click="changeTab(2)">
        About / Resume
      </AppButton>
      <div class="underline" :style="underlineStyles"></div>
    </div>
  </header>
</template>

<script>
import Button from './Button.vue';

function actualTabChange(tab) {
  setTimeout(() => {
    const tabEl = this.$refs[`tab${tab}`].$el;

    this.underlineStyles = {
      left : (parseInt(tabEl.offsetLeft, 10) - 30) + 'px',
      width: tabEl.clientWidth + 'px'
    };
  });
}

export default {
  components: { AppButton: Button },

  data() {
    return {
      actualTab        : 0,
      draggingMenu     : false,
      initialMousePosX : 0,
      intiialScrollLeft: 0,
      underlineStyles  : null,
      showIconRight    : true,
      showIconLeft     : false
    };
  },

  methods: {
    startDragMenu(e) {
      e.preventDefault();

      this.draggingMenu      = true;
      this.initialMousePosX  = e.x;
      this.intiialScrollLeft = e.currentTarget.scrollLeft;

      console.log('[Drag start]');
    },

    moveMenu(e) {
      if (!this.draggingMenu) {
          return;
      }

      console.log('[Drag]');
      e.currentTarget.scrollLeft = this.intiialScrollLeft + this.initialMousePosX - e.x;

      this.showIconRight = e.currentTarget.scrollWidth - e.currentTarget.offsetWidth -
                           e.currentTarget.scrollLeft > 2;
      this.showIconLeft  = e.currentTarget.scrollLeft > 2;
    },

    stopDragMenu(e) {
      e.preventDefault();

      console.log('[Drag Stop]');
      this.draggingMenu = false;
    },

    changeTab(i) {
      this.actualTab = i;
    }
  },

  watch: {
    actualTab: actualTabChange
  },

  created() {
    actualTabChange.call(this, 0);
  }
}
</script>

<style lang="sass">
@import '../main.scss';

header {
  background-color: $mainBackgroundColor;
  box-sizing: border-box;
  color: $menuColor;
  height: $menuHeight;
  padding: $menuPadding;

  h1 {
    border-bottom: $menuBorder;
    font-family: $menuFontFamily;
    font-size: $nameSize;
    font-weight: $nameWeight;
    margin: 0;
    padding-bottom: $namePadding;

    a {
      color: inherit;
      font-weight: inherit;
      text-decoration: none;
    }
  }

  .menu {
    height: $itemsHeight;
    white-space: nowrap;
    overflow: hidden;

    .button {
      color: $menuColor;
      cursor: pointer;
      display: inline-block;
      font-family: $menuFontFamily;
      font-size: $menuFontSize;
      font-weight: $menuFontWidth;
      height: $itemsHeight;
      letter-spacing: 2px;
      line-height: $itemsHeight;
      padding: 0 $itemsHeaderPadding;
      text-align: center;
      text-transform: uppercase;
    }

    .item:not(:first-child) {
      margin-left: $itemsMargin;
    }

    .underline {
      background-color: $itemsBorderColor;
      height: $itemsBorderHeight;
      position: relative;
      top: -1 * $itemsBorderHeight + 1px;
      @include transition(left, width);
    }
  }
}

@include minMedia(0px, 479px) {
  .menu.showIconLeft:before {
    content: '<';

    position: absolute;
    margin-top: 13px;
    left: 10px;

    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }

  .menu.showIconRight:after {
    content: '>';

    position: absolute;
    margin-top: -40px;
    right: 5px;

    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    width: 25px;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }
}
</style>
