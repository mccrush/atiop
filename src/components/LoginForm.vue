<template>
  <form class="form-inline px-3 py-2">
    <div class="form-group">
      <input type="email" class="form-control form-control-sm" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" />
      <small id="emailHelp" class="form-text text-muted">
        <router-link to="/restorpass">Восстановить пароль</router-link>
      </small>
    </div>
    <div class="form-group">
      <input type="password" class="form-control form-control-sm" id="password" placeholder="Password" v-model="password" />
      <small id="emailHelp" class="form-text text-muted">
        <router-link to="/signin">Зарегистрироваться</router-link>
      </small>
    </div>
    <button type="button" @click.prevent="login" class="btn btn-sm btn-secondary btn-block">Войти</button>
  </form>
</template>


<script>
// @ is an alias to /src
import { auth } from "@/main.js";

export default {
  name: "loginform",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  mounted() {},
  created() {},
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$store.state.userId = user.uid;
          this.$router.push("/app");
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("LoginForm: errors:", errorCode, "& ", errorMessage);
        });
    }
  }
};
</script>
<!-- Add "scoped" -->
<style scoped>
.dropmenu {
  width: 220px;
}
</style>
