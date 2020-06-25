<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <router-view />
    </div>
    <Settings />
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
      user: auth.currentUser
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

