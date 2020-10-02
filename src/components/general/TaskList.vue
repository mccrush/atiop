<template>
  <div class="task-list">
    <Task
      v-for="task in sortTasks"
      :key="task.id"
      :task="task"
      @edit-item="editItem"
      :settings="settings"
    />
    <input
      v-if="status !== 'done'"
      type="text"
      class="form-control form-control-sm border-0 bg-light ml-2 mb-2 add-task"
      :class="{ 'border-danger': error, 'mt-2 mr-2': !sortTasks.length }"
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
      if (this.projectId) {
        return this.tasks.filter((task) => task.projectId === this.projectId)
      } else {
        return this.tasks
      }
    },
    tasksTodoWork() {
      if (this.settings.showArhived || this.status === 'done') {
        return this.taskProjectId
      } else {
        return this.taskProjectId.filter(
          (task) => task.status === 'todo' || task.status === 'work'
        )
      }
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
    sortTasks() {
      return this.tasksTodoWork.sort((a, b) => {
        if (this.settings.sortBy === 'position') {
          return a.position - b.position
        } else if (this.settings.sortBy === 'date') {
          return new Date(a.date) - new Date(b.date)
        } else if (this.settings.sortBy === 'deadline') {
          return new Date(a.deadline) - new Date(b.deadline)
        } else if (this.settings.sortBy === 'price') {
          return a.price - b.price
        }
      })
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
          Date.now().toString(),
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
