<template>
  <div class="modal fade" id="formRestore" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-body p-0">
          <div class="container-fluid">
            <div class="row justify-content-center">
              <div class="col-12 pt-3 pb-3 bg-light shadow-sm">
                <h4 class="text-center">Восстановление пароля</h4>
                <form>
                  <div class="form-group">
                    <label for="emailr">Email адрес</label>
                    <input type="email" class="form-control form-control-sm" id="emailr" aria-describedby="emailHelp" placeholder="Enter email" v-model="email" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                  </div>
                  <button type="button" @click="restore" class="btn btn-sm btn-danger btn-block">Восстановить</button>

                  <small class="form-text text-center mt-3">
                    <a href="#" @click="hideFormRestore" class="text-muted" title="Войти">Войти</a>&nbsp;или
                    <a href="#" @click="hideFormRestore2" class="text-muted" title="Зарегистрироваться">зарегистрироваться</a>
                  </small>
                  <!-- <p class="message" v-if="showMess">Ссылка для восстановления пароля отправлена на указанный Email. Проверьте почту.</p> -->
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
  name: "formRestore",
  components: {},
  data() {
    return {
      email: ""
    };
  },
  mounted() {},
  created() {},
  methods: {
    restore() {
      auth
        .sendPasswordResetEmail(this.email)
        .then(() => {
          $("#formRestore").modal("hide");
          $("#formLogin").modal("show");
        })
        .catch(function(error) {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("Signin: errors:", errorCode, "& ", errorMessage);
        });
    },
    hideFormRestore() {
      $("#formRestore").modal("hide");
      $("#formLogin").modal("show");
    },
    hideFormRestore2() {
      $("#formRestore").modal("hide");
      $("#formSignin").modal("show");
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