<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="(item, indexp) in projArr" :key="'pj'+indexp">{{indexp+1}}. {{item.title}}</li>
  </ul>
</template>

<script>
export default {
  name: "listproj",
  props: {
    index: Number
  },
  data() {
    return {
      projArr: []
    };
  },
  created() {
    console.log("Пришел index", this.index);
    console.log("Текущий массив:", this.$store.state.projArr);
    let idSphe = this.$store.state.spheId[this.index];
    this.projArr = this.$store.state.projArr.filter(function(item) {
      return item.sphe == idSphe;
    });
    console.log("Получили новый projArr", this.projArr);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col-2 {
  padding-left: 0;
  padding-right: 0;
}
</style>
