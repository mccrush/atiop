<template>
  <div class="col-3 border-right">
    <h4 class="text-center pt-2">{{title}}</h4>
    <ul class="list-group list-group-flush" v-if="this.$store.state.taskArr[0] && this.$store.state.listArr[0] && this.$store.state.proj !== ''">
      <li class="list-group-item" v-for="(item, index) in taskArr" :key="'ta'+index">{{index+1}}. {{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    index: Number,
    title: String
  },
  data() {
    return {
      taskArr: [],
      id: ""
    };
  },
  created() {
    // console.log("Пришел index", this.index);
    // console.log("Текущий массив:", this.$store.state.taskArr);
    // this.id = this.$store.state.listId[this.index];
    // this.taskArr = this.$store.state.taskArr.filter(function(item) {
    //   return item.list == this.id;
    // });
    // console.log("Получили новый taskArr", this.taskArr);
  },
  mounted() {
    this.$store.watch(
      state => state.proj,
      (newV, oldV) => {
        if (newV !== "") {
          console.log("Пришел index", this.index);
          console.log("Текущий массив:", this.$store.state.taskArr);
          this.id = this.$store.state.listId[this.index];
          this.taskArr = this.$store.state.taskArr.filter(function(item) {
            return item.list == this.id;
          });
          console.log("Получили новый taskArr", this.taskArr);
        }
      }
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col-3 {
  padding-right: 0;
}
</style>
