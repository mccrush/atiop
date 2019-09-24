<template>
  <nav class="navbar navbar-light bg-white border-bottom pt-0 pb-0">
    <a class="navbar-brand" href="/">
      <img src="/img/icons/favicon-32x32.png" width="32" height="32" class="d-inline-block align-top" alt="Контроль" />
      <small class="d-inline-block ml-2 pt-2 font-weight-bold">Контроль</small>
    </a>

    <ul class="nav">
      <!-- <li class="nav-item">
        <router-link to="/" class="nav-link pr-0">
          <button class="btn btn-sm btn-outline-secondary">Инструкция</button>
        </router-link>
      </li>-->
      <!-- <li class="nav-item" v-if="!this.$store.state.sphe">
        <router-link to="/" class="nav-link pr-0">
          <button class="btn btn-outline-warning btn-sm">Вход</button>
        </router-link>
      </li>-->
      <li class="nav-item" v-if="this.$store.state.userId && this.$route.path !== '/app'">
        <router-link to="/app" class="nav-link pr-0">
          <button class="btn btn-sm btn-outline-warning">Приложение</button>
        </router-link>
      </li>
      <li class="nav-item" v-if="!this.$store.state.userId">
        <Login2 />
      </li>
      <li class="nav-item" v-if="this.$store.state.userId">
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
  data() {
    return {
      showButton: false
    };
  },
  mounted() {
    //console.log("Head: this.$route.path:", this.$route.path);
  },
  created() {
    auth.onAuthStateChanged(function(user) {
      console.log("Head: Выполнился метод auth.onAuthStateChanged");
      if (user) {
        console.log("Head: Пользователь вошел в аккаунт");
      } else {
        console.log("Head: Пользователь вышел из аккаунта");
      }
    });
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
