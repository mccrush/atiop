<template>
  <div id="app">
    <Head v-if="this.store.uid" />

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
      this.$store.commit("setUid", {
        uid: auth.currentUser.uid
      });
      //this.uid = auth.currentUser.uid;
    }
  }
};
</script>

<style>
</style>
