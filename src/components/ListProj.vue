<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" v-for="(item, index) in projArr" :key="'pj'+index">
      <button type="button" class="btn btn-sm btn-block btn-light" @click="setState(item.id)">{{index+1}}. {{item.title}}</button>
    </li>
  </ul>
</template>

<script>
import store from "@/store";

export default {
  name: "listproj",
  props: {
    id: String
  },
  data() {
    return {
      projArr: []
    };
  },
  created() {
    //console.log("ListProj: Пришел id", this.id);
    this.projArr = this.$store.state.projArr.filter(item => {
      return item.sphe == this.id;
    });
    //console.log("ListProj: projArr", this.projArr);
  },
  methods: {
    setState(id) {
      this.$store.state.proj = id;
      //console.log("ListProj: proj id =", this.$store.state.proj);
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
