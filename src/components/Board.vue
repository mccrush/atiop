<template>
  <div class="col-10 border-right">
    <div class="row">
      <List title="Задачи" />
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
  props: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.col-10 {
  padding-left: 0;
  padding-right: 0;
}
</style>
