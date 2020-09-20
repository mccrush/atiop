<template>
  <div class="task-list">
    <Task
      v-for="task in taskProjectId"
      :key="task.id"
      :task="task"
      @edit-item="editItem"
      :settings="settings"
    />
    <input
      v-if="status !== 'work' && status !== 'done'"
      type="text"
      class="form-control form-control-sm border-0 bg-light ml-2 mb-2 add-task"
      :class="{'border-danger': error}"
      placeholder="Добавить задачу"
      v-model.trim="title"
      @focus="error = false"
      @keypress.enter="addItem"
    />
  </div>
</template>

<script>
import Task from '@/components/alltasks/Task'
import createTask from '@/scripts/createTask'

export default {
  components: {
    Task,
  },
  props: ['napravId', 'projectId', 'status'],
  date() {
    return {
      title: '',
      error: false,
    }
  },
  computed: {
    tasks() {
      if (this.status) {
        return this.$store.getters.tasks.filter(
          (task) => task.status === this.status
        )
      } else {
        return this.$store.getters.tasks
      }
    },
    taskProjectId() {
      return this.tasks.filter((task) => task.projectId === this.projectId)
    },
    napravs() {
      return this.$store.getters.napravs
    },
    projects() {
      return this.$store.getters.projects
    },
    settings() {
      return this.$store.getters.settings
    },
  },
  methods: {
    addItem() {
      if (this.title) {
        const napravTitle = this.napravs.find(
          (item) => item.id === this.napravId
        ).title
        const projectTitle = this.projects.find(
          (item) => item.id === this.projectId
        ).title
        const type = 'tasks'
        const item = createTask(
          this.title,
          type,
          this.napravId,
          this.projectId,
          this.tasks.length,
          napravTitle,
          projectTitle
        )
        this.title = ''
        this.$store.dispatch('addItem', item)
      } else {
        this.error = true
      }
    },
    editItem({ id, type }) {
      this.$emit('edit-item', { id, type })
    },
  },
}
</script>

<style scoped>
.add-task {
  width: 192px;
}
</style>
