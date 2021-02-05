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
      class="form-control form-control-sm border-0 bg-light ms-2 mb-2 add-task"
      :class="{ 'border-danger': error, 'mt-2 me-2': !sortTasks.length }"
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
        if (this.settings.sortUp) {
          if (this.settings.sortBy === 'position') {
            return a.position - b.position
          } else if (this.settings.sortBy === 'date') {
            return new Date(a.date) - new Date(b.date)
          } else if (this.settings.sortBy === 'deadline') {
            return new Date(a.deadline) - new Date(b.deadline)
          } else if (this.settings.sortBy === 'price') {
            return a.price - b.price
          } else if (this.settings.sortBy === 'time') {
            return a.time - b.time
          }
        } else {
          if (this.settings.sortBy === 'position') {
            return b.position - a.position
          } else if (this.settings.sortBy === 'date') {
            return new Date(b.date) - new Date(a.date)
          } else if (this.settings.sortBy === 'deadline') {
            return new Date(b.deadline) - new Date(a.deadline)
          } else if (this.settings.sortBy === 'price') {
            return b.price - a.price
          } else if (this.settings.sortBy === 'time') {
            return b.time - a.time
          }
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

.task-list {
  max-height: calc(100vh - 178px);
  overflow-y: auto;
  overflow-x: hidden;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 0.2rem;
  margin-top: 8px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 0.2rem;
}

::-webkit-scrollbar-thumb:hover {
  background: #a9a9a9;
}

::-webkit-scrollbar-thumb:active {
  background: #787878;
}
</style>
