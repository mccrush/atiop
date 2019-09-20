<template>
  <div class="container-fluid">
    <div class="row border-bottom">
      <div class="col-4">
        <a class="navbar-brand" href="/">
          <img src="/img/icons/favicon-32x32.png" width="32" height="32" class="d-inline-block align-top" alt="ATIOP" />
        </a>
      </div>
      <div class="col-4"></div>
      <div class="col-4">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link to="/about" class="nav-link">Инструкция</router-link>
          </li>
          <li class="nav-item" v-if="!this.$store.state.userId">
            <router-link to="/login" class="nav-link">Войти</router-link>
          </li>
          <li class="nav-item" v-if="this.$store.state.userId">
            <router-link to="/logout" class="nav-link">Выйти</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Head2",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" -->
<style scoped>
</style>
