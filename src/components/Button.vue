<template>
  <span>
    <a :v-link="link" @click="click" :class="classes" :disabled="disabled" v-if="link">
      <i :class="iconClass" v-if="icon"></i>
      <span><slot></slot></span>
    </a>
    <button @click="click" :class="classes" :disabled="disabled" v-if="!link">
      <i :class="iconClass" v-if="icon"></i>
      <span><slot></slot></span>
    </button>
  </span>
</template>

<script>
import Waves from 'node-waves';

Waves.init({ duration: 400 });

export default {
  props: {
    link    : Object,
    disabled: Boolean,
    icon    : String,
    raised  : Boolean,
    fab     : Boolean,
    colored : Boolean,
    light   : { type: Boolean, default: true }
  },
  computed: {
    classes() {
      return {
        'button'         : true,
        'waves-effect'   : true,
        'waves-light'    : this.light,
        'button--icon'   : this.icon,
        'button--colored': this.colored
      };
    },

    iconClass() {
      return `icon-${this.icon}`;
    }
  },
  methods: {
    click(e) {
      this.$emit('click', e);
    }
  }
}
</script>

<style lang="sass">
@import '../../node_modules/node-waves/src/scss/waves.scss';
@import '../main.scss';

.button .waves-effect.waves-light .waves-ripple {
  background: rgba(255, 255, 255, 0.4);
}

.button {
  background: 0 0;
  border: none;
  border-radius: 2px;
  color: #000;
  position: relative;
  height: 36px;
  min-width: 64px;
  padding: 0 16px;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 0;
  overflow: hidden;
  @include transition(box-shadow, background-color, color);
  outline: none;
  cursor: pointer;
  text-decoration: none;
  text-align: center;
  line-height: 36px;
  vertical-align: middle;

  &:hover {
    background-color: rgba(158, 158, 158, 0.2);
  }

  &.button--colored {
    color: #fff;
    background-color: $itemsBorderColor;
  }

  &.button--icon {
    display: flex;
    align-items: center;

    i {
      margin-right: 5px;
    }
  }
}

a.button.button--icon {
  display: inline-block;
}
</style>
