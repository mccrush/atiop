<template>
  <div class="modal fade" id="formLogin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="container-fluid">
            <div class="row justify-content-center">
              <div class="col-12 pt-3 pb-3 bg-light">
                <h4 class="text-center">Авторизация</h4>
                <form>
                  <div class="form-group">
                    <label for="emaill">Email адрес</label>
                    <input type="email" class="form-control form-control-sm" id="emaill" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                    <label for="passwordl">Пароль</label>
                    <input type="password" class="form-control form-control-sm" id="passwordl" placeholder="Password" v-model="password" />
                  </div>
                  <button type="button" @click="login" class="btn btn-sm btn-success btn-block">Войти</button>

                  <small class="form-text text-center mt-3">
                    <a href="#" @click="hideFormLogin" class="text-muted" title="Зарегистрироваться">Зарегистрироваться</a>&nbsp;или
                    <a href="#" @click="hideFormLogin2" class="text-muted" title="Восстановить пароль">восстановить пароль</a>
                  </small>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { auth } from "@/main.js";

export default {
  name: "formLogin",
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
        .then(user => {
          //console.log("afte log uid=", auth.currentUser.uid);

          this.$store.commit("setUid", {
            uid: auth.currentUser.uid,
            uemail: auth.currentUser.email
          });

          this.$router.push("/app");
          $("#formLogin").modal("hide");
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Login: errors:", errorCode, "& ", errorMessage);
        });
    },
    hideFormLogin() {
      $("#formLogin").modal("hide");
      $("#formSignin").modal("show");
    },
    hideFormLogin2() {
      $("#formLogin").modal("hide");
      $("#formRestore").modal("show");
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