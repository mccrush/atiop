<template>
  <div class="row h-100">
    <ListNapravGeneral :napravs="napravs" :projects="projects" @edit-item="editItem" />
    <Modal :item="item" />
  </div>
</template>

<script>
import $ from 'jquery'
import ListNapravGeneral from '@/components/general/ListNapravGeneral'
import Modal from '@/components/Modal'

export default {
  components: {
    ListNapravGeneral,
    Modal
  },
  data() {
    return {
      item: null
    }
  },
  computed: {
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
      } else {
        this.item = this.napravs.find(item => item.id === id)
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

.ower {
  overflow: auto;
  margin-bottom: 59px;
}
</style>