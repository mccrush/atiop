<template>
  <div class="col-3 border-right">
    <h4 class="text-center pt-2">{{title}}</h4>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="(item, index) in taskArr" :key="'ta'+index">{{index+1}}. {{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    id: String,
    title: String
  },
  data() {
    return {
      taskArr: []
    };
  },
  created() {},
  mounted() {
    this.$store.watch(
      state => state.proj,
      (newV, oldV) => {
        if (newV !== "") {
          console.log("List: new state.proj=", newV);
          this.taskArr = this.$store.state.taskArr.filter(item => {
            return item.list == this.id;
          });
          //console.log("List: taskArr", this.taskArr);
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
