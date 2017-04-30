  <template>
    <header class="gj-header">
        <h1 class="gj-header__title">Gabriel Juchault</h1>
        <nav class="gj-header__nav" ref="nav" :style="hasMenu">
            <router-link to="/" class="gj-header__nav__link">Projects</router-link>
            <router-link to="/posts" class="gj-header__nav__link">Posts</router-link>
            <div class="gj-header__nav__space"></div>
            <a class="gj-header__nav__button" :href="cv">Resume</a>
        </nav>
        <div class="gj-header__underline" :style="underlineStyle"></div>
    </header>
</template>

<script>
import cv from '../resumes.json'

export default {
  data() {
    return {
      cv,
      underlines: []
    }
  },

  computed: {
    hasMenu() {
      return {
        opacity: this.$route.meta.hideMenu ? 0 : 1,
        pointerEvents: this.$route.meta.hideMenu ? 'none' : 'all'
      }
    },

    index() {
      return this.$route.meta.index
    },

    underlineStyle() {
      return Object.assign({
        opacity: this.$route.meta.hideMenu ? 0 : 1
      }, this.underlines[this.index])
    }
  },

  mounted() {
    this.underlines = Array
      .from(this.$refs.nav.children)
      .map((link) => link.getBoundingClientRect().width)
      .map((size, index, arr) => {
        const prev = arr
          .slice(0, index)
          .reduce((a, b) => a + b, 0)

        return {
          left: `${30 + prev}px`,
          width: `${size}px`
        }
      })
  }
}
</script>

<style>
.gj-header {
  background-color: #0d3745;
  padding: 30px 30px 0;
  position: relative;
}

.gj-header__title {
  border-bottom: 1px solid rgba(255, 255, 255, 0.6);
  color: #fff;
  font-family: Lato, sans-serif;
  font-size: 32px;
  font-weight: 200;
  margin: 0;
  padding-bottom: 11px;
}

.gj-header__nav {
  display: flex;
}

.gj-header__nav__link {
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-family: Lato, sans-serif;
  font-size: 14px;
  font-weight: 400;
  height: 57px;
  letter-spacing: 1px;
  line-height: 57px;
  padding: 0 16px;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
}

.gj-header__nav__space {
  flex: 1;
}

.gj-header__nav__button {
  align-self: center;
  background-color: #1abc9c;
  border-radius: 3px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14),
              0 3px 1px -2px rgba(0, 0, 0, .2),
              0 1px 5px 0 rgba(0, 0, 0, .12);
  color: #fff;
  padding: 10px 14px;
  text-decoration: none;
  text-transform: uppercase;
  transition: .1s background-color ease-out;
}

.gj-header__nav__button:hover {
  background-color: #17a689;
  transition: .1s background-color ease-in;
}

.gj-header__underline {
  background-color: #1abc9c;
  bottom: 0;
  height: 4px;
  position: absolute;
  transition: left .2s ease, width .2s ease;
}
</style>
