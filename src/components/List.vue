<template>
  <div class="col-5 border-right">
    <h4 class="text-center pt-2">{{title}}</h4>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="(value, name, index) in listObj" :key="'ta'+index">{{index+1}}. {{value.title}}</li>
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
    delete this.listObj.title;
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
