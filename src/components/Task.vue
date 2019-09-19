<template>
  <li class="list-group-item shadow-sm rounded p-0 mb-2" :id="taskId">
    <div v-if="!showForm" class="pt-2 pb-2 pl-2 task-item" @click="editItem">
      {{itemTitle}}
      <button class="btn btn-sm btn-light text-center delbutton" @click="deleteItem">D</button>
    </div>

    <input class="form-control form-control-sm formitem" v-if="showForm" v-model="itemTitle" @blur="hideForm" @focus="hideBorder" type="text" />
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
    return {
      showForm: false,
      itemTitle: this.tasktitle
    };
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
    },
    editItem(e) {
      this.showForm = true;
    },
    hideBorder(e) {
      e.target.style = "border-bottom: 1px solid #dee2e6 !important;";
    },
    hideForm(e) {
      if (!this.itemTitle) {
        e.target.style = "border-bottom: 1px solid #dc3545 !important;";
      } else {
        e.target.style = "border-bottom: 1px solid #dee2e6 !important;";
        this.showForm = false;
        this.$store.commit("renameElement", {
          type: "t",
          spheid: this.$store.state.sphe,
          projid: this.$store.state.proj,
          listid: this.listId,
          taskid: this.taskId,
          title: this.itemTitle
        });
      }
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
  top: 3px;
  right: 3px;
  cursor: pointer;
}

.task-item:hover .delbutton {
  display: block;
}

.formitem {
  font-size: 14px;
  outline: none;
  border: none;
  border-bottom: 1px solid #dee2e6 !important;
  color: #212529;
  padding: 18px 0 19px 8px;
}
</style>