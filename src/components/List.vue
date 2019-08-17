<template>
  <div class="col-3 border-right">
    <h4 class="text-center pt-2">Следующее</h4>
    <ul class="list-group list-group-flush" v-if="this.$store.state.taskArr[0]">
      <li class="list-group-item" v-for="(item, index) in this.$store.state.taskArr" :key="'ta'+index">{{index+1}}. {{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "list",
  props: {
    index: Number
  },
  data() {
    return {
      taskArr: []
    };
  },
  created() {
    console.log("Пришел index", this.index);
    console.log("Текущий массив:", this.$store.state.taskArr);
    let id = this.$store.state.listId[this.index];
    this.taskArr = this.$store.state.taskArr.filter(function(item) {
      return item.list == id;
    });
    console.log("Получили новый projArr", this.taskArr);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
