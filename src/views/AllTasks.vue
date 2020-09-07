<template>
  <div class="d-flex flex-row">
    <Task v-for="task in tasks" :key="task.id" :task="task" @edit-item="editItem" />
    <Modal :item="item" />
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import Task from '@/components/alltasks/Task'
import Modal from '@/components/Modal'

export default {
  components: {
    Task,
    Modal,
  },
  data() {
    return {
      item: null,
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks
    },
  },
  methods: {
    editItem({ id, type }) {
      if (type === 'tasks') {
        this.item = this.tasks.find((item) => item.id === id)
      } else {
        this.item = this.projects.find((item) => item.id === id)
      }
      let myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
      myModal.show()
    },
  },
}
</script>

