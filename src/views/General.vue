<template>
  <div class="row">
    <ListSpher :sphers="sphers" :napravs="napravs" :projects="projects" />
  </div>
</template>

<script>
import ListSpher from '@/components/general/ListSpher'

export default {
  components: {
    ListSpher
  },
  computed: {
    sphers() {
      return this.$store.getters.sphers
    },
    napravs() {
      return this.$store.getters.napravs
    },
    projects() {
      return this.$store.getters.projects
    }
  }
}
</script>