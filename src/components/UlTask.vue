<template>
  <ul class="list-group list-group-flush">
    <Task v-for="(value, taskid, index) in listObj" :key="'ta'+taskid+index" :taskId="taskid" :tasktitle="value.prop.title" :listId="listId" />
    <li class="list-group-item text-center small border-0 pl-0 pr-0">
      <input v-if="showForm" type="text" class="form-control form-control-sm" placeholder="Заголовок задачи + Enter" id="formNewSphe" @keypress="saveNewItem" v-model="nameNewItem" @blur="hideForm" autofocus />
      <a href="#" class="btn btn-sm btn-light btn-block text-left text-muted" v-if="!showForm" @click="createNewItem">Добавить задачу</a>
    </li>
  </ul>
</template>

<script>
import Task from "@/components/Task.vue";

export default {
  name: "UlTask",
  components: {
    Task
  },
  props: {
    listId: String,
    listObj: Object
  },
  data() {
    return {
      showForm: false,
      nameNewItem: ""
    };
  },
  methods: {
    createNewItem() {
      this.showForm = true;
    },
    saveNewItem(e) {
      if (e.keyCode == 13) {
        let payload = {
          type: "t",
          spheid: this.$store.state.sphe,
          projid: this.$store.state.proj,
          listid: this.listId,
          child: {
            prop: { title: this.nameNewItem },
            child: {}
          }
        };
        this.$store.commit("addElement", payload);
        this.nameNewItem = "";
        this.showForm = false;
      }
    },
    hideForm() {
      if (!this.nameNewItem) {
        this.showForm = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" -->
<style scoped>
.list-group-item {
  margin-bottom: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  border: none;
}
</style>
