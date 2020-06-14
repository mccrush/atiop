<template>
  <div class="row">
    <ListSpher :sphers="sphers" :napravs="napravs" :projects="projects" @edit-item="editItem" />
    <Modal :item="item" />
  </div>
</template>

<script>
import $ from 'jquery'
import ListSpher from '@/components/general/ListSpher'
import Modal from '@/components/Modal'

export default {
  components: {
    ListSpher,
    Modal
  },
  data() {
    return {
      item: null
    }
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
  },
  methods: {
    editItem({ id, type }) {
      if (type === 'projects') {
        this.item = this.projects.find(item => item.id === id)
      } else if (type === 'napravs') {
        this.item = this.napravs.find(item => item.id === id)
      } else {
        this.item = this.sphers.find(item => item.id === id)
      }
      $('#exampleModal').modal('show')
    }
  }
}
</script>

<style>
.elem {
  user-select: none;
}
</style>