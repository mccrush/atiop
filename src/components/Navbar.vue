<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom">
    <router-link class="navbar-brand" to="/" tag="a">
      <img
        src="img/icons/favicon-32x32.png"
        width="32"
        height="32"
        class="d-inline-block align-top"
        alt="ATIOP"
      />
      ATIOP
    </router-link>
    <button
      class="navbar-toggler mr-5"
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
          <router-link to="/" class="nav-link">Проекты</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/general" class="nav-link">Обзор</router-link>
        </li>

        <li class="nav-item">
          <router-link to="/plans" class="nav-link">Планы</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/create" class="nav-link">Создать</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">Справка</router-link>
        </li>
      </ul>
      <form @submit.prevent="logOut" class="form-inline mr-5">
        <span v-if="user.uid" class="text-muted small mr-3">{{'@'+ user.email.split('@')[0]}}</span>
        <button
          v-if="user.uid"
          class="d-sm-inline btn btn-sm btn-light border text-muted"
          title="Выйти"
          type="submit"
        >Выйти</button>
        <router-link
          v-else
          tag="button"
          class="d-sm-inline btn btn-sm btn-success"
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
    async logOut() {
      await this.$store.dispatch('logOut')
      this.$router.push('/about')
    }
  }
}
</script>


<style scoped>
</style>
