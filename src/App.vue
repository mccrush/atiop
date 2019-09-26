<template>
  <div id="app">
    <Head :uid="uid" />

    <router-view />
    <Foot />
  </div>
</template>

<script>
import { auth } from "@/main.js";
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";

export default {
  name: "app",
  components: {
    Head,
    Foot
  },
  data() {
    return {
      uid: ""
    };
  },
  mounted() {
    if (auth.currentUser) {
      this.uid = auth.currentUser.uid;
    }
  }
};
</script>

<style>
</style>
