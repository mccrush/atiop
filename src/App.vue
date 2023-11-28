<template>
  <div>
    <TheNavbar />
    <div class="container-fluid">
      <component :is="component" class="pt-3" />
    </div>
    <TheFooter />
  </div>
</template>

<script>
import TheNavbar from './components/interface/TheNavbar.vue'
import TheFooter from './components/interface/TheFooter.vue'
import PageLogin from './pages/PageLogin.vue'
//import PageMain from './pages/PageMain.vue'
import PageWeb from './pages/PageWeb.vue'

export default {
  components: {
    TheNavbar,
    TheFooter,
    PageLogin,
    PageWeb
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    },
    component() {
      if (this.currentUserId) {
        return 'PageWeb'
      } else {
        return 'PageLogin'
      }
    }
  }
}
</script>

<style>
.btn:focus,
.btn-close:focus,
.btn-check:focus + .btn-outline-dark,
.form-control:focus,
.form-select:focus,
.accordion-button:focus,
.navbar-toggler:focus {
  outline: 0 !important;
  box-shadow: none !important;
  /* border-color: #dee2e6; */
}

.cursor-pointer,
.dropdown-item {
  cursor: pointer;
}

.cursor-default {
  cursor: default;
}

.dropdown-item.active,
.dropdown-item:active {
  color: #fff;
  text-decoration: none;
  background-color: #ffc107;
}

.text-ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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