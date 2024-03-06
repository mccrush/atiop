<template>
  <div class="row">
    <KanbanListDirections />
    <div class="col-10">
      <div class="row">
        <KanbanList
          v-for="project in projects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </div>
</template>

<script>
import KanbanListDirections from './KanbanListDirections.vue'
import KanbanList from './KanbanList.vue'

export default {
  components: {
    KanbanListDirections,
    KanbanList
  },
  computed: {
    directionId() {
      return this.$store.getters.directionId
    },
    projects() {
      if (this.directionId) {
        return this.$store.getters.project.filter(
          item => item.parentId === this.directionId
        )
      }
      return []
    }
  }
}
</script>