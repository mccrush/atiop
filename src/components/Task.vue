<template>
  <li class="list-group-item shadow-sm rounded pb-1 pl-2 mb-2 task-item" :id="taskId">
    {{tasktitle}}
    <button class="btn btn-sm btn-light text-center delbutton" @click="deleteItem">D</button>
  </li>
</template>

<script>
export default {
  name: "Task",
  props: {
    listId: String, // Не используется
    taskId: String,
    tasktitle: String
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    deleteItem(e) {
      e.target.parentNode.classList.add("d-none"); // Вынужденная мера, т.к. DOM не сразу обновляется сам
      this.$store.commit("deleteElement", {
        type: "t",
        spheid: this.$store.state.sphe,
        projid: this.$store.state.proj,
        listid: this.listId,
        taskid: this.taskId
      });
    }
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

.delbutton {
  position: absolute;
  float: right;
  width: 30px;
  display: none;
  top: 4px;
  right: 3px;
  cursor: pointer;
}

.task-item:hover .delbutton {
  display: block;
}
</style>