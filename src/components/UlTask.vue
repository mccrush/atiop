<template>
  <ul class="list-group list-group-flush">
    <Task v-for="(value, index) in taskArr" :key="'ulta'+index" :task="value" :listId="listId" />
    <li class="list-group-item text-center small border-0 pl-0 pr-0">
      <input v-if="showForm" type="text" class="form-control form-control-sm" placeholder="Заголовок задачи + Enter" id="formNewSphe" @keyup.enter="saveNewItem" v-model="nameNewItem" @blur="hideForm" autofocus />
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
    listId: String
  },
  data() {
    return {
      showForm: false,
      nameNewItem: "",
      taskArr: this.$store.getters.taskArr.filter(
        task => task.list == this.listId
      )
    };
  },
  // computed: {
  //   taskArr() {
  //     return this.$store.getters.taskArr.filter(
  //       task => task.list == this.listId
  //     );
  //   }
  // },
  methods: {
    createNewItem() {
      this.showForm = true;
    },
    saveNewItem(e) {
      //if (e.keyCode == 13) {
      let payload = {
        type: "task",
        spheId: this.$store.state.sphe,
        projId: this.$store.state.proj,
        listId: this.listId,
        item: {
          id: "" + Date.now(),
          title: this.nameNewItem,
          pos: 1,
          sphe: this.$store.state.sphe,
          proj: this.$store.state.proj,
          list: this.listId
        }
      };
      this.$store.commit("addItem", payload);
      this.nameNewItem = "";
      this.showForm = false;
      // }
    },
    hideForm() {
      if (!this.nameNewItem) {
        this.showForm = false;
      }
    }
  },
  computed: {}
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
