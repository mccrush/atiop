<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="(item, index) in projArr" :key="'pj'+index">
      <button type="button" class="btn btn-sm btn-block btn-light" @click="setState(item.id)">.{{item.title}}</button>
    </li>
  </ul>
</template>

<script>
import store from "@/store";

export default {
  name: "listproj",
  props: {
    id: String,
    array: Array
  },
  data() {
    return {
      projArr: []
    };
  },
  created() {
    console.log("ListProj: Пришел id", this.id);
    console.log("ListProj: Пришел array", this.array);
    //console.log("ListProj: Текущий массив:", this.$store.state.projArr);
    //const id = this.$store.state.spheId[this.index];
    this.projArr = this.array.filter(function(item) {
      return item.sphe == this.id;
    });
    console.log("ListProj: Получили новый projArr", this.projArr);
  },
  methods: {
    setState(id) {
      this.$store.state.proj = id;
      //this.$store.state.proj = this.$store.state.projId[index];
      console.log("ListProj: Новое значение proj id =", this.$store.state.proj);
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
