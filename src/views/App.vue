<template>
  <div class="container-fluid bg-white pb-3">
    <div class="row">
      <UlSphe />
      <UlList />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { auth } from "@/main.js";
import UlSphe from "@/components/UlSphe.vue";
import UlList from "@/components/UlList.vue";

export default {
  name: "App",
  components: {
    UlSphe,
    UlList
  },
  created() {
    this.$store.commit("getMainObject");
  }
};
</script>
