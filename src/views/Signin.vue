<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-4 mt-5 border pt-3 pb-3 bg-light">
        <h4 class="text-center">Регистрация</h4>
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
          <button type="button" @click="login" class="btn btn-sm btn-secondary btn-block">Зарегистрироваться</button>

          <small class="form-text mt-3">
            <router-link to="/login" class="text-muted" title="У меня уже есть аккаунт">У меня уже есть аккаунт</router-link>
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
  name: "signin",
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
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // this.$store.state.userId = auth.currentUser.uid;
          this.$router.push("/app");
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Signin: errors:", errorCode, "& ", errorMessage);
        });
    }
  }
};
</script>
