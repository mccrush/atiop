<template>
  <div class="col-10 border-right">
    <div class="row">
      <List v-for="(item, index) in listArr" :key="'lt'+index" :title="item.title" :id="item.id" />
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
          this.listArr = this.$store.state.listArr.filter(item => {
            return item.proj == newV;
          });
          //this.$store.state.list = this.listArr[0].id;
          //console.log("Board: listArr", this.listArr);
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
