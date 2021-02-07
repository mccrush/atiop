<template>
  <div class="task-list">
    <ul class="list-group mt-3">
      <TaskTable
        v-for="task in sortTasks"
        :key="task.id"
        :task="task"
        @edit-item="editItem"
        :settings="settings"
      />
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <input
          v-if="status !== 'done'"
          type="text"
          class="form-control form-control-sm border-0 bg-light add-task"
          :class="{ 'border-danger': error, 'mt-2 me-2': !sortTasks.length }"
          placeholder="Добавить задачу"
          v-model.trim="title"
          @focus="error = false"
          @keypress.enter="addItem"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import TaskTable from '@/components/task/TaskTable'
import createTask from '@/scripts/createTask'
import sortMethod from '@/scripts/sortMethod'

export default {
  components: {
    TaskTable,
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
      return sortMethod(
        this.tasksTodoWork,
        this.settings.sortUp,
        this.settings.sortBy
      )
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
