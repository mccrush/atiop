<template>
  <div>
    <Navbar @show-settings="showSettings = !showSettings" />
    <div class="container-fluid">
      <router-view />
    </div>
    <Settings class="formset" :class="{'right-0' : showSettings }" />
  </div>
</template>

<script>
import { auth } from '@/main.js'
import Navbar from '@/components/Navbar'
import Settings from '@/components/Settings'

export default {
  components: {
    Navbar,
    Settings
  },
  data() {
    return {
      user: auth.currentUser,
      showSettings: false
    }
  },
  mounted() {
    console.log('user in app:', this.user)

    auth.onAuthStateChanged(user => {
      this.user = user

      if (this.user) {
        this.$store.dispatch('getItems', 'napravs')
        this.$store.dispatch('getItems', 'projects')
        this.$store.dispatch('getItems', 'tasks')
      }
    })
  }
}
</script>


<style scoped>
.formset {
  width: 200px;
  position: absolute;
  top: 59px;
  right: -200px;
  transition: 0.5s;
}

.right-0 {
  right: 0;
}
</style>
