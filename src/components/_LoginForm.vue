<template>
  <form class="form-inline py-2">
    <table class="mr-3">
      <tr>
        <td>
          <small class="form-text m-0">
            <router-link to="/signin" class="text-muted" title="Зарегистрироваться">Зарегистрироваться</router-link>
          </small>
        </td>
      </tr>
      <tr>
        <td>
          <small class="form-text m-0">
            <router-link to="/repass" class="text-muted" title="Восстановить пароль">Восстановить пароль</router-link>
          </small>
        </td>
      </tr>
    </table>

    <input type="email" class="form-control form-control-sm mr-3" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" />

    <input type="password" class="form-control form-control-sm mr-3" id="password" placeholder="Password" v-model="password" />

    <button type="button" @click.prevent="login" class="btn btn-sm btn-success">Войти</button>
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
          //console.log("user.uid=", user.uid);
          //this.$store.state.userId = user.uid;
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
a {
  text-decoration: underline;
}

a:hover {
  text-decoration: none;
}
</style>
