<template>
  <div class="border rounded">
    <div>{{ item.title }}</div>
    <div>{{ item.id }}</div>
  </div>
</template>

<script>
export default {
  props: {
    item: Object
  }
}
</script>