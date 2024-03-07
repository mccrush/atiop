<template>
  <div class="col-3 rounded p-2 ms-2">
    <h6 class="fw-bold m-0">{{ project.title }}</h6>
    <div class="d-flex justify-content-end border-bottom pb-2">
      <span class="badge text-bg-light">{{ tasks.length }}</span>
      <span v-if="taskMoneySum" class="badge bg-light text-success ms-1">{{
        taskMoneySum
      }}</span>
      <span v-if="taskMoneyTime" class="badge bg-light text-secondary ms-1">{{
        taskMoneyTime
      }}</span>
    </div>
    <div>
      <KanbanCard v-for="task in tasks" :key="task" :item="task" />
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
    },
    taskMoneySum() {
      return this.tasks.reduce((sum, item) => sum + item.price, 0)
    },
    taskMoneyTime() {
      return this.tasks.reduce((sum, item) => sum + item.minutes, 0)
    }
  }
}
</script>