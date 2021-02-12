<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/about" tag="a">
        <img
          src="/img/icons/logo_7.svg"
          height="26"
          class="d-inline-block mb-1 me-1"
          alt="ATIOP"
        />
        ATIOP
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto" @click.prevent="$emit('hide-settings')">
          <li class="nav-item">
            <router-link
              to="/"
              class="nav-link"
              :class="{ disabled: !user }"
              :aria-disabled="user ? 'true' : 'false'"
              >Задачи</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/projects"
              class="nav-link"
              :class="{ disabled: !user }"
              :aria-disabled="user ? 'true' : 'false'"
              >Проекты</router-link
            >
          </li>
          <!-- <li class="nav-item">
            <router-link
              to="/plan"
              class="nav-link"
              :class="{ disabled: !user }"
              :aria-disabled="user ? 'true' : 'false'"
              >План</router-link
            >
          </li> -->
          <li class="nav-item">
            <router-link
              to="/review"
              class="nav-link"
              :class="{ disabled: !user }"
              :aria-disabled="user ? 'true' : 'false'"
              >Обзор</router-link
            >
          </li>

          <li class="nav-item">
            <router-link
              to="/items"
              class="nav-link"
              :class="{ disabled: !user }"
              :aria-disabled="user ? 'true' : 'false'"
              >Items</router-link
            >
          </li>

          <!-- <li class="nav-item">
            <router-link
              to="/calendar"
              class="nav-link"
              :class="{'disabled': !user}"
              :aria-disabled="user ? 'true': 'false'"
            >Календарь</router-link>
          </li> -->
        </ul>
        <div>
          <!-- <div
            v-if="user && $route.path !== '/login'"
            class="d-inline-block me-2"
          >

            <button
              class="btn btn-sm btn-light border"
              :title="'Вы вошли как @' + userName"
              @click.prevent="logOut"
            >
              Выйти
            </button>
          </div> -->
          <!-- <router-link
            v-if="!user && $route.path !== '/login'"
            tag="button"
            class="d-sm-inline btn btn-sm btn-success me-2 login"
            title="Войти"
            to="/login"
            >Войти</router-link
          > -->
          <button
            v-if="$route.path !== '/login'"
            class="btn btn-sm p-0 me-1 opacity-04"
            @click.prevent="$emit('show-settings')"
            title="Настройки"
          >
            <img
              src="/img/icons_tool/gear.svg"
              width="24"
              height="24"
              alt="Настройки"
            />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { auth } from '@/firebase.js'
//import { Collapse } from 'bootstrap'

export default {
  name: 'navbar',
  data() {
    return {
      user: auth.currentUser,
      userName: '',
    }
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.user = user
    })
    // if (this.user) {
    //   this.userName = this.user.email.split('@')[0]
    // }
  },
  // methods: {
  //   async logOut() {
  //     await this.$store.dispatch('logOut')
  //     this.$router.push('/login#in')
  //   },
  // },
}
</script>


<style scoped>
.opacity-04 {
  opacity: 0.4;
}

a.router-link-active {
  color: #ffc107 !important;
  /* font-weight: bold; */
  /* border-bottom: 2px solid #ffc107; */
}
a.router-link-active.login {
  color: #fff !important;
  /* font-weight: bold; */
  /* border-bottom: 2px solid #ffc107; */
}

.btn-light {
  background-color: #fff;
  color: #dee2e6;
}

.btn-light:hover {
  background-color: #e2e6ea;
  color: #212529;
}
</style>
