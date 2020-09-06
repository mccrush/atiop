<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/" tag="a">
        <img
          src="/img/icons/favicon-30x30.png"
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
            >Древо</router-link>
          </li>

          <li class="nav-item">
            <router-link
              to="/plans"
              class="nav-link"
              :class="{'disabled': !user}"
              :aria-disabled="user ? 'true': 'false'"
            >Календарь</router-link>
          </li>
          <!-- <li class="nav-item">
          <router-link
            to="/create"
            class="nav-link"
            :class="{'disabled': !user}"
            :aria-disabled="user ? 'true': 'false'"
          >Создать</router-link>
          </li>-->
          <li class="nav-item">
            <router-link to="/about" class="nav-link">Справка</router-link>
          </li>
        </ul>
        <form @submit.prevent="logOut" class="form-inline">
          <div v-if="user" class="d-inline-block dropdown">
            <button
              class="btn btn-sm dropdown-toggle text-muted"
              type="button"
              id="userData"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >{{'@'+ user.email.split('@')[0]}}</button>
            <div class="dropdown-menu" aria-labelledby="userData">
              <router-link to="/user" class="dropdown-item">Профиль</router-link>
              <button class="dropdown-item btn-link" type="submit" href="#">Выйти</button>
            </div>
          </div>
          <router-link
            v-else
            tag="button"
            class="d-sm-inline btn btn-sm btn-success"
            title="Войти"
            to="/login"
          >Войти</router-link>
          <button class="btn btn-sm p-0 ml-3 opacity-06" @click.prevent="$emit('show-settings')">
            <img src="@/assets/icons/gear.svg" width="24" height="24" alt="Настройки" />
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import { auth } from '@/main.js'

export default {
  name: 'navbar',
  data() {
    return {
      user: auth.currentUser,
    }
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.user = user
    })
  },
  methods: {
    async logOut() {
      await this.$store.dispatch('logOut')
      this.$router.push('/login#in')
    },
  },
}
</script>


<style scoped>
.opacity-06 {
  opacity: 0.6;
}
</style>
