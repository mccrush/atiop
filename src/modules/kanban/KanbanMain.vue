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
    <KanbanSidebar />
  </div>
</template>

<script>
import KanbanListDirections from './KanbanListDirections.vue'
import KanbanList from './KanbanList.vue'
import KanbanSidebar from './KanbanSidebar.vue'

export default {
  components: {
    KanbanListDirections,
    KanbanList,
    KanbanSidebar
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