<template>
  <nav class="navbar navbar-light bg-white border-bottom pt-0 pb-0">
    <div class="navbar-brand">
      <router-link to="/about" title="О приложении">
        <img src="/img/icons/favicon-32x32.png" width="32" height="32" class="d-inline-block align-top" alt="Контроль" />
        <small class="d-inline-block ml-2 pt-2 font-weight-bold">Контроль</small>
      </router-link>
    </div>

    <ul class="nav">
      <li class="nav-item" v-if="this.$store.state.uid && this.$route.path !== '/app'">
        <router-link to="/app" class="nav-link">
          <button class="btn btn-sm btn-outline-warning">Перейти в приложение</button>
        </router-link>
      </li>
      <li class="nav-item pt-2 pr-2 uemail" v-if="this.$store.state.uid">
        <small class="text-muted">{{this.$store.state.uemail}}</small>
      </li>
      <li class="nav-item" v-if="this.$store.state.uid">
        <router-link to="#" class="nav-link pr-0 pl-2">
          <button class="btn btn-sm btn-outline-secondary" @click="logout">Выйти</button>
        </router-link>
      </li>
      <li class="nav-item" v-if="!this.$store.state.uid">
        <button class="btn btn-sm btn-success ml-3" data-toggle="modal" data-target="#formLogin">Войти</button>
      </li>
      <li class="nav-item" v-if="!this.$store.state.uid">
        <button class="btn btn-sm btn-warning ml-3" data-toggle="modal" data-target="#formSignin">Зарегистрироваться</button>
      </li>
    </ul>
    <!-- Формы  -->
    <FormLogin />
    <FormSignin />
    <!-- Конец формы -->
  </nav>
</template>

<script>
import { auth } from "@/main.js";
import FormLogin from "@/components/FormLogin.vue";
import FormSignin from "@/components/FormSignin.vue";

export default {
  name: "Head",
  components: {
    FormLogin,
    FormSignin
  },
  props: {},
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
          this.$store.commit("clearUid");
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
/* .navbar {
  height: 58px;
} */
.uemail {
  line-height: 2.1;
}
a {
  color: black;
}
</style>
