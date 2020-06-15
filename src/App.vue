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
import Navbar from '@/components/Navbar'
import Settings from '@/components/Settings'

export default {
  components: {
    Navbar,
    Settings
  }
}
</script>
<style>
</style>
