<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-4 mt-5 border pt-3 pb-3 bg-light shadow-sm">
        <h4 class="text-center">Авторизация</h4>
        <form>
          <div class="form-group">
            <label for="email">Email адрес</label>
            <input type="email" class="form-control form-control-sm" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="password">Пароль</label>
            <input type="password" class="form-control form-control-sm" id="password" placeholder="Password" v-model="password" />
          </div>
          <button type="button" @click="login" class="btn btn-sm btn-success btn-block">Войти</button>

          <small class="form-text text-center mt-3">
            <router-link to="/signin" class="text-muted" title="Зарегистрироваться">Зарегистрироваться</router-link>&nbsp;или
            <router-link to="/repass" class="text-muted" title="Восстановить пароль">Восстановить пароль</router-link>
          </small>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
// @ is an alias to /src
import { auth } from "@/main.js";

export default {
  name: "login",
  components: {},
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
        .then(() => {
          // this.$store.state.userId = auth.currentUser.uid;
          this.$router.push("/app");
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Login: errors:", errorCode, "& ", errorMessage);
        });
    }
  }
};
</script>
<!-- Add "scoped" -->
<style scoped>
a {
  text-decoration: underline;
}

a:hover {
  text-decoration: none;
}
</style>