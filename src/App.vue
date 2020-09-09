<template>
  <div class="overflow-hidden">
    <Navbar @show-settings="showSettings = !showSettings" />
    <div class="container-fluid">
      <transition name="component-fade" mode="out-in">
        <router-view />
      </transition>
    </div>
    <Settings class="formset" :class="{'right-0' : showSettings }" />
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
import Navbar from '@/components/Navbar'
import Settings from '@/components/Settings'
import Message from '@/components/Message'

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
  async mounted() {},
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


<style scoped>
.formset {
  width: 200px;
  position: absolute;
  top: 57px;
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

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active до версии 2.1.8 */ {
  opacity: 0;
}
</style>
