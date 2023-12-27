<template>
  <div>
    <TheNavbar />
    <TheSidebar />
    <div class="container-fluid pt-3 pb-5">
      <component :is="component" />
    </div>
    <TheFooter />

    <transition name="slide-fade">
      <TheMessage
        v-if="showMessage"
        :message="loginMessage.text"
        :class="loginMessage.type"
      />
    </transition>
  </div>
</template>

<script>
import TheNavbar from './components/interface/TheNavbar.vue'
import TheSidebar from './components/interface/TheSidebar.vue'
import TheFooter from './components/interface/TheFooter.vue'
import TheMessage from './components/interface/TheMessage.vue'
import PageLogin from './pages/PageLogin.vue'
import PageMob from './pages/PageMob.vue'
import PageWeb from './pages/PageWeb.vue'

export default {
  components: {
    TheNavbar,
    TheSidebar,
    TheFooter,
    TheMessage,
    PageLogin,
    PageMob,
    PageWeb
  },
  data() {
    return {
      showMessage: false
    }
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    },
    component() {
      if (!this.currentUserId) {
        return 'PageLogin'
      } else {
        if (window.innerWidth < 768) {
          return 'PageMob'
        } else {
          return 'PageWeb'
        }
      }
    },
    loginMessage() {
      return this.$store.getters.loginMessage
    }
  },
  watch: {
    loginMessage() {
      if (this.loginMessage) {
        console.log('new message = ', this.loginMessage)
        this.showMessage = true
        setTimeout(() => {
          this.showMessage = false
          this.$store.commit('addMessage', 'null')
        }, 3600)
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

.text-nodecoration {
  text-decoration: none;
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