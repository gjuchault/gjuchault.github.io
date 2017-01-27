<template>
  <header>
    <h1>Gabriel Juchault</h1>

    <div class="menu" draggable="true"
       :class="{ showIconRight: showIconRight, showIconLeft: showIconLeft }"
       @dragstart="startDragMenu"
       @mousemove="moveMenu"
       @mouseup="stopDragMenu"
       @mouseleave="stopDragMenu">
      <AppButton data-link="/" ref="tab0" @click="changeTab(0)" :span="true">
        Projects
      </AppButton>
      <AppButton data-link="/articles" ref="tab1" @click="changeTab(1)" :span="true">
        Articles
      </AppButton>
      <AppButton data-link="/about" ref="tab2" @click="changeTab(2)" :span="true">
        About / Resume
      </AppButton>
      <div class="underline" :style="underlineStyles"></div>
    </div>
  </header>
</template>

<script>
import Button from './Button.vue';

function actualTabChange(tab) {
  console.log('[tab change]', tab);
  setTimeout(() => {
    const tabEl = this.$refs[`tab${tab}`].$el.children[0];

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

      const link = this.$refs[`tab${i}`].$el.getAttribute('data-link');

      this.$router.push(link);
    }
  },

  watch: {
    actualTab: actualTabChange
  },

  mounted() {
    const button = Object
      .keys(this.$refs)
      .filter(name => {
        return this.$route.path.indexOf(this.$refs[name].$el.getAttribute('data-link')) > -1;
      })
      .pop();

    if (button) {
      this.actualTab = parseInt(button.slice('tab'.length), 10);
      actualTabChange.call(this, this.actualTab);
    } else {
      actualTabChange.call(this, 0);
    }
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
    font-size: $nameSize;
    margin: 0;
    padding-bottom: $namePadding;

    a {
      color: inherit;
      text-decoration: none;
    }
  }

  .menu {
    height: $itemsHeight;
    opacity: 1;
    overflow: hidden;
    transition: opacity .2s ease;
    white-space: nowrap;

    .app.app--on-article & {
      opacity: 0;
    }

    .button {
      color: $menuColor;
      cursor: pointer;
      display: inline-block;
      font-family: $sourceSansPro;
      font-size: $menuFontSize;
      font-weight: 400;
      height: $itemsHeight;
      letter-spacing: 2px;
      line-height: $itemsHeight;
      padding: 0 $itemsHeaderPadding;
      text-align: center;
      text-transform: uppercase;
    }

    .underline {
      background-color: $itemsBorderColor;
      height: $itemsBorderHeight;
      position: relative;
      top: -1 * ($itemsBorderHeight + 1px);
      @include transition(left, width);
    }
  }
}

@include minMedia(0px, 450px) {
  .menu.showIconLeft:before {
    content: '\E408';
    font-family: 'icomoon' !important;
    font-size: 24px;
    left: 10px;
    margin-top: 13px;
    position: absolute;
  }

  .menu.showIconRight:after {
    content: '\E409';
    font-family: 'icomoon' !important;
    font-size: 24px;
    margin-top: -46px;
    position: absolute;
    right: 5px;
  }
}
</style>
