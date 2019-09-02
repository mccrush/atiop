<template>
  <ul class="list-group list-group-flush">
    <Task v-for="(value, name, i) in listObjClear" :key="'ta'+name+i" :taskId="name" :taskObj="value" :listId="listId" />
    <li class="list-group-item text-center small border-0">
      <a href="#">Добавить задачу</a>
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
    this.listObjClear = this.listObj;
    delete this.listObjClear.title;
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
