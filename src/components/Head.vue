<template>
  <nav class="navbar navbar-light bg-white border-bottom pt-0 pb-0">
    <a class="navbar-brand" href="/about">
      <img src="/img/icons/favicon-32x32.png" width="32" height="32" class="d-inline-block align-top" alt="Контроль" />
      <small class="d-inline-block ml-2 pt-2 font-weight-bold">Контроль</small>
    </a>

    <ul class="nav">
      <!-- <li class="nav-item">
        <router-link to="/about" class="nav-link pr-0">
          <button class="btn btn-sm btn-outline-secondary">Инструкция</button>
        </router-link>
      </li>-->
      <!-- <li class="nav-item" v-if="!this.$store.state.sphe">
        <router-link to="/login" class="nav-link pr-0">
          <button class="btn btn-outline-warning btn-sm">Вход</button>
        </router-link>
      </li>-->
      <li class="nav-item" v-if="!this.$store.state.sphe">
        <Login2 />
      </li>
      <li class="nav-item" v-if="this.$store.state.sphe">
        <router-link to="#" class="nav-link pr-0 pl-2">
          <button class="btn btn-sm btn-outline-secondary" @click="logout">Выйти</button>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { auth } from "@/main.js";
import Login2 from "@/components/Login2.vue";

export default {
  name: "Head",
  components: {
    Login2
  },
  methods: {
    logout() {
      auth
        .signOut()
        .then(function() {
          console.log("Head: Выполнился метод auth.signOut()");
        })
        .catch(function(error) {
          console.log("Head: errors,", error);
        });
    }
  }
};
</script>

<!-- Add "scoped" -->
<style scoped>
</style>
