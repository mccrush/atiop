<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-white border-bottom">
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
    <router-view v-if="this.$store.state.projArr[0] && this.$store.state.spheArr[0] && this.$store.state.listArr[0] && this.$store.state.taskArr[0]" />
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
  },
  mounted() {
    var user = auth.currentUser;

    if (user) {
      console.log("Пользователь авторизован");

      // User is signed in.
    } else {
      // No user is signed in.
      console.log("Пользователь Не авторизован");
      this.$router.push("/login");
    }
  }
};
</script>

<style>
</style>
