<template>
  <nav class="navbar navbar-expand-sm navbar-light bg-white border-bottom">
    <a class="navbar-brand" href="#">
      <img
        src="img/icons/favicon-32x32.png"
        width="32"
        height="32"
        class="d-inline-block align-top"
        alt="ATIOP"
      />
      ATIOP
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/" class="nav-link">Projects</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/general" class="nav-link">General</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/plans" class="nav-link">Plans</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" class="nav-link">Create</router-link>
        </li>
        <!-- <li class="nav-item">
          <router-link to="/about" class="nav-link">About</router-link>
        </li>-->
      </ul>
      <form @submit.prevent="logOut" class="form-inline mr-5">
        <button
          v-if="user"
          class="d-sm-inline btn btn-sm btn-light border text-muted"
          title="Выйти"
          type="submit"
        >Выйти</button>
        <router-link
          v-else
          tag="button"
          class="d-sm-inline btn btn-sm btn-light border text-muted"
          title="Войти"
          to="/login"
        >Войти</router-link>
      </form>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'navbar',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut')
    }
  }
}
</script>


<style scoped>
</style>
