<template>
  <div class="mess shadow-sm rounded text-white">
    <p class="m-0">{{ message }}</p>
  </div>
</template>

<script>
export default {
  props: { message: String }
}
</script>

<style scoped>
.mess {
  position: fixed;
  width: 250px;
  bottom: 48px;
  right: 16px;
  padding: 8px 16px;
}
</style>