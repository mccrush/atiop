<template>
  <ul class="list-group list-group-flush">
    <Task v-for="(value, taskid, index) in listObj" :key="'ta'+taskid+index" :taskId="taskid" :tasktitle="value.title" :listId="listId" />
    <li class="list-group-item text-center small border-0 pl-0 pr-0">
      <a href="#" class="btn btn-sm btn-light btn-block text-left">Добавить задачу</a>
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
      listObjClear: {}
    };
  },
  mounted() {
    //this.listObjClear = Object.assign({}, this.listObj);
    //delete this.listObjClear.title;
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
