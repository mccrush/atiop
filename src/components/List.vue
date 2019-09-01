<template>
  <div class="col-5 border-right bg-light">
    <h5 class="text-center pt-2 border-bottom pb-2">{{title}}</h5>
    <ul class="list-group list-group-flush">
      <li class="list-group-item shadow-sm mb-1 mt-1 border-0 text-muted" v-for="(value, name, index) in listObj" :key="'ta'+index">{{value.title}}</li>
      <li class="list-group-item text-center small border-0">
        <a href="#" @click="createTask">Добавить задачу</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    title: String,
    listObj: Object
  },
  data() {
    return {
      //taskArr: []
    };
  },
  created() {
    ///console.log("List: before del title this.projObj=", this.listObj);
    //delete this.listObj.title;
    //console.log("List: after del title this.projObj=", this.listObj);
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
