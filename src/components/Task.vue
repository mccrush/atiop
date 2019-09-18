<template>
  <li class="list-group-item shadow-sm rounded pt-2 pl-2 mb-2 task-item" :id="taskId">{{tasktitle}}</li>
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.task-item {
  border-bottom: 4px solid rgb(255, 193, 7);
}
</style>