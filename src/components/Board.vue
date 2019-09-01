<template>
  <div class="col-8 border-right">
    <div class="row" v-if="this.$store.state.proj">
      <List v-for="(value, name, index) in projObj" :key="'lt'+index" :title="value.title" />
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
      //spheId: this.$store.state.sphe || "",
      spheObj: {},
      projObj: {},
      listObj: {}
    };
  },
  created() {},
  mounted() {
    this.$store.watch(
      state => state.proj,
      (newV, oldV) => {
        this.spheObj = this.$store.state.mapTask[this.$store.state.sphe];
        this.projObj = this.spheObj[newV];
        delete this.projObj["title"];
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
