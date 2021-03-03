<template>
  <div class="row bg-success p-3 kanban">
    <div class="my-width-none p-0">
      <List
        v-for="list in items"
        :key="'list' + list.id"
        :list="list"
        @edit-item="editItem"
      />
    </div>
    <ModalForm
      v-if="itemForModal"
      :item="itemForModal"
      :napravs="napravs"
      :projects="projects"
      id="exampleModal"
    />
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import List from '@/components/item/List'
import ModalForm from '@/components/item/ModalForm'

export default {
  components: {
    List,
    ModalForm,
  },
  data() {
    return {
      itemForModal: null,
    }
  },
  computed: {
    viewType() {
      return this.$store.getters.viewType
    },
    items() {
      if (this.viewType === 'tasks') {
        return this.$store.getters['projects2']
      }
      return this.$store.getters[this.viewType + '2']
    },
    napravs() {
      return this.$store.getters.napravs2
    },
    projects() {
      return this.$store.getters.projects2
    },
    tasks() {
      return this.$store.getters.tasks2
    },
  },
  methods: {
    editItem({ id, type }) {
      this.itemForModal = this[type].find((item) => item.id === id)
      let myModal = new Modal(document.getElementById('exampleModal'))
      myModal.show()
    },
  },
}
</script>

<style scoped>
.kanban {
  height: calc(100vh - 60px);
  overflow-y: auto;
}

.my-width-none {
  width: auto !important;
  max-width: none !important;
}
</style>