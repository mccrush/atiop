<template>
  <div class="col-3 rounded p-2 ms-2">
    <h5>{{ project.title }}</h5>
    <div>
      <KanbanCard v-for="task in tasks" :key="task" :task="task" />
    </div>
  </div>
</template>

<script>
import KanbanCard from './KanbanCard.vue'

export default {
  components: {
    KanbanCard
  },
  props: {
    project: Object
  },

  computed: {
    directionId() {
      return this.$store.getters.directionId
    },
    tasks() {
      if (this.project) {
        return this.$store.getters.task.filter(
          item => item.parentId === this.project.id
        )
      }
      return []
    }
  }
}
</script>