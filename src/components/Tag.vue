<template>
  <span class="gj-tag">
    {{ tag }}
  </span>
</template>

<script>
export default {
  props: ['tag']
}
</script>

<style>
.gj-tag {
  background-color: #1abc9c;
  border-radius: 4px;
  color: #222;
  font-size: 12px;
  font-weight: 700;
  line-height: 1;
  margin-left: 2px;
  padding: 3px 10px;
  text-align: center;
  vertical-align: baseline;
  white-space: nowrap;
}
</style>
