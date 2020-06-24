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
//import { auth } from '@/main.js'
import Navbar from '@/components/Navbar'
import Settings from '@/components/Settings'

export default {
  components: {
    Navbar,
    Settings
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  mounted() {
    console.log('user in app:', this.user)

    if (this.user) {
      this.$store.dispatch('getItems', 'napravs')
      this.$store.dispatch('getItems', 'projects')
      this.$store.dispatch('getItems', 'tasks')
    } else {
      this.$router.push('/about')
    }
  }
}
</script>

