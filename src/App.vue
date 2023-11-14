<template>
  <div>
    <TheNavbar />
    <div class="container-fluid">
      <component :is="component" />
    </div>
  </div>
</template>

<script>
import TheNavbar from './components/interface/TheNavbar.vue'
import PageLogin from './pages/PageLogin.vue'
import PageMain from './pages/PageMain.vue'

export default {
  components: {
    TheNavbar,
    PageLogin,
    PageMain
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    },
    component() {
      if (this.currentUserId) {
        return 'PageMain'
      } else {
        return 'PageLogin'
      }
    }
  }
}
</script>

<style>
.btn:focus,
.form-control:focus,
.form-select:focus,
.navbar-toggler:focus {
  outline: 0 !important;
  box-shadow: none !important;
}

.dropdown-item {
  cursor: pointer;
}

.dropdown-item.active,
.dropdown-item:active {
  color: #fff;
  text-decoration: none;
  background-color: #ffc107;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>