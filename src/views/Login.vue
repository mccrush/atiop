<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-6 mt-5 border pt-3 pb-3 bg-light">
        <h3 class="text-center">Login form</h3>
        <form>
          <div class="form-group">
            <label for="email">Email address</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" />
            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" class="form-control" id="password" placeholder="Password" v-model="password" />
          </div>
          <div class="form-group form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1" />
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="button" @click="login" class="btn btn-secondary btn-block">Submit</button>
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
    var user = auth.currentUser;

    if (user) {
      console.log("Login: Пользователь авторизован");
      this.$router.push("/");
      // User is signed in.
    } else {
      // No user is signed in.
      console.log("Login: Пользователь Не авторизован");
      //this.$router.push("/login");
    }
  },
  methods: {
    login() {
      auth
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.$router.push("/");
        })
        .catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Login: errors:", errorCode, "& ", errorMessage);
          // ...
        });
    }
  }
};
</script>
