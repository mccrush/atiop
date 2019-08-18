<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="(item, index) in projArr" :key="'pj'+index">
      <button type="button" class="btn btn-sm btn-block btn-light" @click="setState(index)">{{item.title}}</button>
    </li>
  </ul>
</template>

<script>
import store from "@/store";

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
    const id = this.$store.state.spheId[this.index];
    this.projArr = this.$store.state.projArr.filter(function(item) {
      return item.sphe == id;
    });
    console.log("Получили новый projArr", this.projArr);
  },
  methods: {
    setState(index) {
      this.$store.state.proj = this.$store.state.projId[index];
      console.log("Новое значение proj =", this.$store.state.proj);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.list-group-item {
  border: none;
}
</style>
