<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: {
    Navbar
  }
};
</script>
<style>
</style>
