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
  mounted() {
    if (auth.currentUser) {
      this.$store.dispatch('getItems', 'napravs')
      this.$store.dispatch('getItems', 'projects')
      this.$store.dispatch('getItems', 'tasks')
    } else {
      this.$router.push('/about')
    }
  }
}
</script>
<style>
/* .container-fluid {
  margin-top: 59px;
} */
</style>
