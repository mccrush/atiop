<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white border-bottom">
    <div class="container-fluid">
      <router-link class="d-none d-md-block navbar-brand" to="/about" tag="a">
        <img
          src="/img/icons/logo_7.svg"
          height="26"
          class="d-inline-block mb-1 me-1"
          alt="ATIOP"
        />
        ATIOP
      </router-link>

      <button
        class="opacity-04 navbar-toggler border-0 ps-0 pe-0"
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

      <router-link class="d-md-none navbar-brand me-0" to="/about" tag="a">
        <img
          src="/img/icons/logo_7.svg"
          height="26"
          class="d-inline-block mb-1 me-0"
          alt="ATIOP"
        />
      </router-link>

      <div class="d-flex d-md-none align-items-center">
        <Loading2 v-if="loading2" />
        <div class="dropdown">
          <button
            v-if="$route.path !== '/login'"
            class="opacity-04 btn btn-sm p-0 me-1"
            title="Настройки"
            id="dropdownMenuSettings"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="/img/icons_tool/gear.svg"
              width="24"
              height="24"
              alt="Настройки"
            />
          </button>
          <transition name="slide-fade">
            <SettingsDrop
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuSettings"
            />
          </transition>
        </div>
      </div>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto">
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
      </div>

      <div class="d-none d-md-flex align-items-center">
        <Loading2 v-if="loading2" />
        <div class="dropdown">
          <button
            v-if="$route.path !== '/login'"
            class="opacity-04 btn btn-sm p-0 me-1"
            title="Настройки"
            id="dropdownMenuSettings"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="/img/icons_tool/gear.svg"
              width="24"
              height="24"
              alt="Настройки"
            />
          </button>
          <transition name="slide-fade">
            <SettingsDrop
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuSettings"
            />
          </transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { auth } from '@/firebase.js'
import { Dropdown } from 'bootstrap'
import SettingsDrop from '@/components/additional/SettingsDrop'
import Loading2 from '@/components/additional/Loading2'

export default {
  name: 'navbar',
  components: {
    SettingsDrop,
    Loading2,
  },
  data() {
    return {
      user: auth.currentUser,
      userName: '',
    }
  },
  computed: {
    loading2() {
      return this.$store.getters.loading2
    },
  },
  mounted() {
    auth.onAuthStateChanged((user) => {
      this.user = user
    })
  },
}
</script>


<style scoped>
.navbar-brand {
  font-weight: 600;
}
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
