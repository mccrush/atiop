<template>
  <div class="task-list">
    <Task
      v-for="task in taskProjectId"
      :key="task.id"
      :task="task"
      @edit-item="editItem"
      :settings="settings"
    />
  </div>
</template>

<script>
import Task from '@/components/alltasks/Task'

export default {
  components: {
    Task,
  },
  props: ['projectId'],
  computed: {
    tasks() {
      return this.$store.getters.tasks
    },
    taskProjectId() {
      return this.tasks.filter((task) => task.projectId === this.projectId)
    },
    settings() {
      return this.$store.getters.settings
    },
  },
}
</script>
