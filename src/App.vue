<template>
  <div>
    <Navbar
      v-if="$route.path !== '/about'"
      @show-settings="showSettings = !showSettings"
      @hide-settings="showSettings = false"
    />
    <div class="container-fluid" @click.prevent="showSettings = false">
      <router-view v-slot="{ Component }">
        <transition name="component-fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </div>
    <Settings class="formset" :class="{ 'right-0': showSettings }" />
    <transition name="slide-fade">
      <Message
        v-if="showMessage"
        :message="message.text"
        class="mess shadow-sm rounded text-white"
        :class="message.type"
      />
    </transition>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import Navbar from '@/components/interface/Navbar'
import Settings from '@/components/additional/Settings'
import Message from '@/components/additional/Message'

export default {
  components: {
    Navbar,
    Settings,
    Message,
  },
  data() {
    return {
      //user: auth.currentUser,
      showSettings: false,
      showMessage: false,
    }
  },
  mounted() {
    // console.log('rt:', this.$route.path)
  },
  computed: {
    message() {
      return this.$store.getters.getMessage
    },
  },
  watch: {
    message() {
      if (this.message) {
        this.showMessage = true
        setTimeout(() => {
          this.showMessage = false
        }, 3000)
      }
    },
  },
}
</script>


<style>
.formset {
  width: 200px;
  position: absolute;
  top: 60px;
  right: -200px;
  transition: 0.5s;
}

.right-0 {
  right: 0;
}

.mess {
  position: fixed;
  width: 250px;
  top: 72px;
  right: 16px;
  padding: 8px 16px;
}

.btn:focus {
  outline: 0 !important;
  box-shadow: none !important;
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
