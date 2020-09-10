<template>
  <div class="row h-100">
    <vue-headful title="ATIOP Обзор проектов" description="ATIOP — сервис управления задачами" />
    <div class="row p-0 border-bottom">
      <div class="col-12">
        Всего направлений:
        <span class="badge bg-info mr-1">{{napravs.length}}</span> , проектов:
        <span class="badge bg-secondary mr-1">{{projects.length}}</span> , задач:
        <span class="badge bg-warning mr-1">{{tasks.length}}</span>
      </div>
    </div>
    <ListNapravGeneral :napravs="napravs" :projects="projects" @edit-item="editItem" />
    <Modal :item="item" :napravs="napravs" :projects="projects" />
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import vueHeadful from 'vue-headful'
import ListNapravGeneral from '@/components/general/ListNapravGeneral'
import Modal from '@/components/Modal'

export default {
  components: {
    ListNapravGeneral,
    Modal,
    vueHeadful,
  },
  data() {
    return {
      item: null,
    }
  },
  computed: {
    napravs() {
      return this.$store.getters.napravs
    },
    projects() {
      return this.$store.getters.projects
    },
    tasks() {
      return this.$store.getters.projects
    },
  },
  methods: {
    editItem({ id, type }) {
      if (type === 'projects') {
        this.item = this.projects.find((item) => item.id === id)
      } else {
        this.item = this.napravs.find((item) => item.id === id)
      }
      let myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
      myModal.show()
    },
  },
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