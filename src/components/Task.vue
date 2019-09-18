<template>
  <li class="list-group-item shadow-sm rounded pb-1 pl-2 mb-2 task-item" :id="taskId">{{tasktitle}}</li>
</template>

<script>
export default {
  name: "Task",
  props: {
    listId: String,
    taskId: String,
    tasktitle: String
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

<!-- Add "scoped" -->
<style scoped>
.task-item {
  font-size: 14px;
  border-bottom: 1px solid rgba(52, 58, 64, 0.07) !important;
}

.task-item:hover {
  cursor: pointer;
  background: rgba(52, 58, 64, 0.07);
}
</style>