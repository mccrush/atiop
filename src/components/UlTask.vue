<template>
  <div class="col-4 border-right bg-light">
    <h5 class="text-center pt-2 border-bottom pb-2">{{title}}</h5>
    <ul class="list-group list-group-flush">
      <Task v-for="(value, name, i) in listObjClear" :key="'ta'+name+i" :listId="listId" :taskId="name" :titleList="value.title" :taskObj="value" />
      <li class="list-group-item text-center small border-0">
        <a href="#">Добавить задачу</a>
      </li>
    </ul>
  </div>
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
    title: String,
    listObj: Object
  },
  data() {
    return {
      listObjClear: {}
    };
  },
  mounted() {
    this.listObjClear = this.listObj;
    delete this.listObClear.title;
  },
  methods: {
    createTask() {}
  }
  // mounted() {
  //   this.$store.watch(
  //     state => state.list,
  //     (newV, oldV) => {
  //       if (newV !== "") {
  //         console.log("List: new state.list=", newV);
  //         this.taskArr = this.$store.state.taskArr.filter(item => {
  //           return item.list == this.id;
  //         });
  //       }
  //     }
  //   );
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col-3 {
  padding-right: 0;
}
</style>
