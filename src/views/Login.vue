<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-4 mt-5 border pt-3 pb-3 bg-light">
        <h4 class="text-center">Форма входа</h4>
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
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" checked />
            <label class="form-check-label text-secondary" for="exampleCheck1">
              <small>Запомнить меня</small>
            </label>
          </div>
          <button type="button" @click="login" class="btn btn-sm btn-secondary btn-block">Войти</button>
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
  mounted() {
    /*
    var user = auth.currentUser;

    if (user) {
      console.log("Login: Пользователь авторизован");
      this.$router.push("/");
    } else {
      console.log("Login: Пользователь Не авторизован");
    }*/
  },
  created() {
    auth.onAuthStateChanged(function(user) {
      if (user) {
        console.log("Home: Пользователь вошел в аккаунт");
        //this.$store.state.userId = user.uid;
        //document.location.replace("/");
        //
        //this.$router.push("/");
      }
    });
  },
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$store.state.userId = auth.currentUser.uid;
          this.$router.push("/");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Login: errors:", errorCode, "& ", errorMessage);
          // ...
        });
    },
    rout() {
      this.$router.push("/");
    }
  }
};
</script>
