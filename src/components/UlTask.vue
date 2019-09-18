<template>
  <ul class="list-group list-group-flush">
    <Task v-for="(value, taskid, index) in listObj" :key="'ta'+taskid+index" :taskId="taskid" :tasktitle="value.title" :listId="listId" />
    <li class="list-group-item text-center small border-0 pl-0 pr-0">
      <input v-if="showForm" type="text" class="form-control form-control-sm" placeholder="Заголовок задачи" id="formNewSphe" @keypress="saveNewItem" v-model="nameNewItem" @blur="hideForm" autofocus />
      <a href="#" class="btn btn-sm btn-light btn-block text-left" v-if="!showForm" @click="createNewItem">Добавить задачу</a>
    </li>
  </ul>
</template>

<script>
import Task from "@/components/Task.vue";
//import ListProj from "@/components/ListProj.vue";
//import ListSphe from "@/components/ListSphe.vue";

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
      showForm: false
    };
  },
  methods: {
    createNewItem(e) {
      this.showForm = true;
    },
    saveNewItem(e) {
      if (e.keyCode == 13) {
        let payload = {
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
        this.listObj = this.spheObj.child[this.$store.state.proj].child[
          this.listId
        ].child;
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-item {
  margin-bottom: 0;
  padding-bottom: 0;
  padding-left: 0;
  padding-right: 0;
  border: none;
}
</style>
