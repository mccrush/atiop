<template>
  <li class="list-group-item shadow-sm mb-1 mt-1 border-0 text-muted" id="taskId">{{taskObj.title}}</li>
</template>

<script>
export default {
  name: "task",
  props: {
    listId: String,
    taskId: String,
    taskObj: Object
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    createTask() {}
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>