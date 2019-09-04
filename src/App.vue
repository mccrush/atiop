<template>
  <div id="app">
    <nav class="navbar navbar-expand-sm navbar-light bg-white border-bottom">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/logout" class="nav-link">Logout</router-link>
        </li>
      </ul>
    </nav>
    <router-view />
    <Foot msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import { auth } from "@/main.js";
import Foot from "@/components/Foot.vue";

export default {
  name: "app",
  components: {
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
