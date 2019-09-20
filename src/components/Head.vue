<template>
  <nav class="navbar navbar-light bg-white border-bottom pt-0 pb-0">
    <a class="navbar-brand" href="/">
      <img src="/img/icons/favicon-32x32.png" width="32" height="32" class="d-inline-block align-top mb-1" alt="ATIOP" />
      <small class="d-inline-block ml-2 pt-2 font-weight-bold">ATIOP</small>
    </a>

    <ul class="nav">
      <li class="nav-item">
        <router-link to="/about" class="nav-link pr-0">
          <button class="btn btn-sm btn-outline-secondary">Инструкция</button>
        </router-link>
      </li>
      <li class="nav-item" v-if="!this.$store.state.userId">
        <router-link to="/login" class="nav-link pr-0">
          <button class="btn btn-outline-warning btn-sm">Войти</button>
        </router-link>
      </li>
      <li class="nav-item" v-if="this.$store.state.userId">
        <router-link to="/logout" class="nav-link pr-0">
          <button class="btn btn-sm btn-outline-secondary">Выйти</button>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "Head",
  props: {
    msg: String
  }
};
</script>

<!-- Add "scoped" -->
<style scoped>
</style>
