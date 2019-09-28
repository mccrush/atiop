<template>
  <div class="modal fade" id="formSignin" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="container-fluid">
            <div class="row justify-content-center">
              <div class="col-12 pt-3 pb-3 bg-light shadow-sm">
                <h4 class="text-center">Регистрация</h4>
                <form>
                  <div class="form-group">
                    <label for="emails">Email адрес</label>
                    <input type="email" class="form-control form-control-sm" id="emails" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <div class="form-group">
                    <label for="passwords">Пароль</label>
                    <input type="password" class="form-control form-control-sm" id="passwords" placeholder="Password" v-model="password" />
                  </div>
                  <button type="button" @click="signin" class="btn btn-sm btn-warning btn-block">Зарегистрироваться</button>

                  <small class="form-text text-center mt-3">
                    Или
                    <router-link to="/login" class="text-muted" title="Войти">войти</router-link>
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
  name: "formSignin",
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
    signin() {
      auth
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          // this.$store.state.userId = auth.currentUser.uid;
          this.$router.push("/app");
          $("#formSignin").modal("hide");
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Signin: errors:", errorCode, "& ", errorMessage);
        });
    },
    hideSelf() {
      $("#formSignin").modal("hide");
      $("#formLogin").modal("show");
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