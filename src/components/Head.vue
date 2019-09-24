<template>
  <nav class="navbar navbar-light bg-white border-bottom pt-0 pb-0">
    <div class="navbar-brand">
      <img src="/img/icons/favicon-32x32.png" width="32" height="32" class="d-inline-block align-top" alt="Контроль" />
      <small class="d-inline-block ml-2 pt-2 font-weight-bold">Контроль</small>
    </div>

    <ul class="nav">
      <li class="nav-item" v-if="this.$store.state.userId && this.$route.path !== '/about'">
        <router-link to="/about" class="nav-link pr-0">
          <button class="btn btn-sm btn-outline-secondary">О приложении</button>
        </router-link>
      </li>
      <!-- <li class="nav-item" v-if="!this.$store.state.sphe">
        <router-link to="/" class="nav-link pr-0">
          <button class="btn btn-outline-warning btn-sm">Вход</button>
        </router-link>
      </li>-->
      <li class="nav-item" v-if="this.$store.state.userId && this.$route.path !== '/app'">
        <router-link to="/app" class="nav-link pr-0">
          <button class="btn btn-sm btn-outline-warning">Перейти в приложение</button>
        </router-link>
      </li>
      <li class="nav-item" v-if="!this.$store.state.userId">
        <LoginForm />
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
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Head",
  components: {
    LoginForm
  },
  data() {
    return {};
  },
  mounted() {},
  created() {},
  methods: {
    logout() {
      auth
        .signOut()
        .then(() => {
          this.$store.state.userId = "";
          this.$router.replace("about");
        })
        .catch(error => {
          console.log("Head: errors,", error);
        });
    }
  }
};
</script>

<!-- Add "scoped" -->
<style scoped>
</style>
