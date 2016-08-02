<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="sass">
@import '../main';

.card {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14),
              0 3px 1px -2px rgba(0, 0, 0, .2),
              0 1px 5px 0 rgba(0, 0, 0, .12);
  padding: 25px;
  width: 100%;
}

</style>
