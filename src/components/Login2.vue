<template>
  <div class="btn-group mt-2 ml-2 mb-2">
    <button class="btn btn-outline-warning btn-sm dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">Вход</button>
    <div class="dropdown-menu dropdown-menu-right dropmenu">
      <form class="px-3 py-2">
        <div class="form-group">
          <label for="email">Email адрес</label>
          <input type="email" class="form-control form-control-sm" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" />
          <!-- <small id="emailHelp" class="form-text text-muted">Мы не передаем ваши данные третим лицам</small> -->
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
</template>


<script>
// @ is an alias to /src
import { auth } from "@/main.js";

export default {
  name: "login2",
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
          console.log(
            "Login: Выполнился метод auth.signInWithEmailAndPassword"
          );
          this.$store.state.userId = auth.currentUser.uid;
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
.dropmenu {
  width: 220px;
}
</style>
