<template>
  <div id="app">
    <Head />

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
  }
  // mounted() {
  //   var user = auth.currentUser;

  //   if (user) {
  //     console.log("App: Пользователь авторизован");
  //     this.$store.state.userId = user.uid;
  //     console.log("App: userId", this.$store.state.userId);
  //     this.$store.commit("getTask", user.uid);
  //     // User is signed in.
  //   } else {
  //     // No user is signed in.
  //     console.log("App: Пользователь Не авторизован");
  //     this.$router.push("/login");
  //   }
  // }
};
</script>

<style>
</style>
