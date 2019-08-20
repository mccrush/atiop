<template>
  <div class="col-10 border-right">
    <div class="row" v-if="this.$store.state.proj !== ''">
      <!-- <List v-for="(item, index) in listArr" :key="'lt'+index" :title="item.title" :index="index" /> -->
    </div>
  </div>
</template>

<script>
import store from "@/store";
import List from "@/components/List.vue";

export default {
  name: "board",
  components: {
    List
  },
  props: {},
  data() {
    return {
      listArr: [],
      id: ""
    };
  },
  created() {},
  mounted() {
    this.$store.watch(
      state => state.proj,
      (newV, oldV) => {
        if (newV !== "") {
          console.log("Board: id proj обновился на =", newV);
          // console.log("Старый listArr", this.$store.state.listArr);
          // this.listArr = this.$store.state.listArr.filter(function(item) {
          //   return item.proj == newV;
          // });
          // console.log("Board: Получили новый listArr", this.listArr);
        }
      }
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col-10 {
  padding-left: 0;
  padding-right: 0;
}
</style>
