<template>
  <div>
    <div>Список направлений</div>
    <div>
      <KanbanList
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
    </div>
  </div>
</template>

<script>
import KanbanList from './KanbanList.vue'

export default {
  components: {
    KanbanList
  },
  computed: {
    directions() {
      return this.$store.getters.direction
    },
    projects() {
      return this.$store.getters.project
    }
  }
}
</script>