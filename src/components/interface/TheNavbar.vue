<template>
  <nav class="navbar navbar-expand-md border-bottom">
    <div class="container-fluid">
      <div class="d-none d-md-block navbar-brand">
        <img
          src="/img/icons/logo_8.svg"
          height="26"
          class="d-inline-block mb-1 me-2"
          alt="ATIOP"
        />
        ATIOP&nbsp;2.0
      </div>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <div class="btn-group" role="group" aria-label="Basic example">
          <BtnSelectView
            class="btn-sm ps-3 pe-3"
            :class="{ active: view === 'all' }"
            title="Все"
            @click="setView('all')"
          />
          <BtnSelectView
            class="btn-sm ps-3 pe-3"
            :class="{ active: view === 'date' }"
            title="На сегодня"
            @click="setView('date')"
          />
        </div>
        <div class="me-auto"></div>
        <!-- <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a class="dropdown-item" href="#">Something else here</a></li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">Disabled</a>
          </li>
        </ul> -->

        <BtnLogOut class="btn-sm ps-3 pe-3" @click="logOut" />
      </div>
    </div>
  </nav>
</template>

<script>
import BtnSelectView from './../buttons/BtnSelectView.vue'
import BtnLogOut from './../buttons/BtnLogOut.vue'

export default {
  components: {
    BtnSelectView,
    BtnLogOut
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    },
    view() {
      return this.$store.getters.view
    }
  },
  methods: {
    setView(view) {
      this.$store.commit('setView', view)
    },
    logOut() {
      this.$store.dispatch('logOut')
    }
  }
}
</script>