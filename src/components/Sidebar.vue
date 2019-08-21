<template>
  <div class="col-2 border-right">
    <ListSphe :projArr="this.$store.state.projArr" :spheArr="this.$store.state.spheArr" />
  </div>
</template>

<script>
import ListSphe from "@/components/ListSphe.vue";

export default {
  name: "sidebar",
  components: {
    ListSphe
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
