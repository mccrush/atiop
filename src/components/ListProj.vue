<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="(item, index) in projArr" :key="'pj'+index">{{index+1}}. {{item.title}}</li>
  </ul>
</template>

<script>
export default {
  name: "listproj",
  props: {
    sphe: String
  },
  data() {
    return {
      projArr: []
    };
  },
  created() {
    console.log("Пришел id", this.sphe);
    console.log("Текущий массив:", this.$store.state.projArr);
    this.projArr = this.$store.state.projArr.filter(function(item) {
      return item.sphe == this.sphe;
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
