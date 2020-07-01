<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom">
    <router-link class="navbar-brand" to="/" tag="a">
      <img
        src="img/icons/favicon-30x30.png"
        width="30"
        height="30"
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
          <router-link
            to="/"
            class="nav-link"
            :class="{'disabled': !user}"
            :aria-disabled="user ? 'true': 'false'"
          >Проекты</router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/general"
            class="nav-link"
            :class="{'disabled': !user}"
            :aria-disabled="user ? 'true': 'false'"
          >Обзор</router-link>
        </li>

        <li class="nav-item">
          <router-link
            to="/plans"
            class="nav-link"
            :class="{'disabled': !user}"
            :aria-disabled="user ? 'true': 'false'"
          >Планы</router-link>
        </li>
        <li class="nav-item">
          <router-link
            to="/create"
            class="nav-link"
            :class="{'disabled': !user}"
            :aria-disabled="user ? 'true': 'false'"
          >Создать</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link">Справка</router-link>
        </li>
      </ul>
      <form @submit.prevent="logOut" class="form-inline">
        <span v-if="user" class="text-muted small mr-3">{{'@'+ user.email.split('@')[0]}}</span>
        <button
          v-if="user"
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
        <button class="btn btn-sm p-0 ml-3" @click.prevent="$emit('show-settings')">
          <img src="img/navbar/settings_24px_1.png" width="24" height="24" alt="Настройки" />
        </button>
      </form>
    </div>
  </nav>
</template>

<script>
import { auth } from '@/main.js'

export default {
  name: 'navbar',
  data() {
    return {
      user: auth.currentUser
    }
  },
  mounted() {
    auth.onAuthStateChanged(user => {
      this.user = user
    })
  },
  methods: {
    async logOut() {
      await this.$store.dispatch('logOut')
      this.$router.push('/login#in')
    }
  }
}
</script>


<style scoped>
</style>
