<template>
  <form class="form-inline px-3 py-2">
    <input type="email" class="form-control form-control-sm" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" />
    <input type="password" class="form-control form-control-sm" id="password" placeholder="Password" v-model="password" />
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
          console.log(
            "LoginForm: Выполнился метод auth.signInWithEmailAndPassword"
          );
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
