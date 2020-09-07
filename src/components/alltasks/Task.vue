<template>
  <div
    class="task align-self-start border rounded-sm pt-1 pb-1 pl-2 pr-2 m-2"
    @dblclick.prevent="$emit('edit-item', {id: task.id, type: task.type})"
  >{{task.title}}</div>
</template>

<script>
export default {
  props: ['task'],
}
</script>

<style scoped>
.task {
  width: 192px;
  user-select: none;
  cursor: default;
}
</style>