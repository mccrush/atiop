<template>
  <div class="mess shadow-sm rounded text-white">
    <p class="m-0">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: ['message'],
}
</script>

<style scoped>
.mess {
  position: fixed;
  width: 250px;
  top: 64px;
  right: 8px;
  padding: 8px 16px;
}
</style>