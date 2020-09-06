<template>
  <div class="d-flex flex-row">
    <div
      v-for="task in tasks"
      :key="task.id"
      class="task align-self-start border rounded-sm pt-1 pb-1 pl-2 pr-2 m-2"
    >{{task.title}}</div>
  </div>
</template>

<script>
export default {
  computed: {
    tasks() {
      return this.$store.getters.tasks
    },
  },
}
</script>

<style scoped>
.task {
  width: 256px;
}
</style>