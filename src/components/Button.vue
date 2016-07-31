<template>
  <button @click="click" :class="classes" :disabled="disabled">
    <slot>
      <i class="material-icons" v-if="icon">{{ icon }}</i>
    </slot>
  </button>
</template>

<script>
import Waves from 'node-waves';

Waves.init({ duration: 400 });

export default {
  props: {
    disabled: Boolean,
    icon    : String,
    raised  : Boolean,
    fab     : Boolean,
    colored : Boolean,
    primary : Boolean,
    accent  : Boolean
  },
  computed: {
    classes() {
      return {
        'button'         : true,
        'waves-effect'   : true,
        'waves-light'    : true,
        'button--icon'   : this.icon,
        'button--raised' : this.raised,
        'button--fab'    : this.fab,
        'button--colored': this.colored,
        'button--primary': this.primary,
        'button--accent' : this.accent
      };
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
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 14px;
  font-weight: 500;
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
}

</style>
