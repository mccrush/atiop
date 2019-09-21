<template>
  <nav class="navbar navbar-light bg-white border-bottom pt-0 pb-0">
    <a class="navbar-brand" href="/about">
      <img src="/img/icons/favicon-32x32.png" width="32" height="32" class="d-inline-block align-top" alt="Контроль" />
      <small class="d-inline-block ml-2 pt-2 font-weight-bold">Контроль</small>
    </a>

    <ul class="nav">
      <!-- <li class="nav-item">
        <router-link to="/about" class="nav-link pr-0">
          <button class="btn btn-sm btn-outline-secondary">Инструкция</button>
        </router-link>
      </li>-->
      <!-- <li class="nav-item" v-if="!this.$store.state.sphe">
        <router-link to="/login" class="nav-link pr-0">
          <button class="btn btn-outline-warning btn-sm">Вход</button>
        </router-link>
      </li>-->
      <li class="nav-item">
        <Login2 />
        <!-- <div class="btn-group mt-2 ml-2">
          <button class="btn btn-outline-warning btn-sm dropdown-toggle" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">Вход 2</button>
          <div class="dropdown-menu dropdown-menu-right">
            <form class="px-4 py-3">
              <div class="form-group">
                <label for="exampleDropdownFormEmail1">Email address</label>
                <input type="email" class="form-control" id="exampleDropdownFormEmail1" placeholder="email@example.com" />
              </div>
              <div class="form-group">
                <label for="exampleDropdownFormPassword1">Password</label>
                <input type="password" class="form-control" id="exampleDropdownFormPassword1" placeholder="Password" />
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input type="checkbox" class="form-check-input" id="dropdownCheck" />
                  <label class="form-check-label" for="dropdownCheck">Remember me</label>
                </div>
              </div>
              <button type="submit" class="btn btn-primary">Sign in</button>
            </form>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="#">New around here? Sign up</a>
            <a class="dropdown-item" href="#">Forgot password?</a>
          </div>
        </div>-->
      </li>
      <li class="nav-item" v-if="this.$store.state.sphe">
        <router-link to="#" class="nav-link pr-0 pl-2">
          <button class="btn btn-sm btn-outline-secondary" @click="logout">Выйти</button>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import { auth } from "@/main.js";
import Login2 from "@/components/Login2.vue";

export default {
  name: "Head",
  components: {
    Login2
  },
  props: {
    msg: String
  },
  methods: {
    logout() {
      auth
        .signOut()
        .then(function() {})
        .catch(function(error) {
          console.log("Head: errors,", error);
        });
    }
  }
};
</script>

<!-- Add "scoped" -->
<style scoped>
</style>
