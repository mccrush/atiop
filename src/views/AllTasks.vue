<template>
  <div>
    <div class="row p-0 border-bottom">
      <div class="col-2 p-2">
        <select class="form-control form-control-sm" v-model="filterType" @change="saveFilterType">
          <option value selected>Без фильтра</option>
          <option value="status">По статусу</option>
          <option value="napravId">С направлениями</option>
          <option value="projectId">С проектами</option>
          <option value="date">С датами</option>
          <option value="deadline">С дедлайнами</option>
        </select>
      </div>
      <div class="col-2 p-2">
        <select
          class="form-control form-control-sm"
          v-model="filterValue"
          @change="saveFilterValue"
          :disabled="!filterType || filterType === 'date' || filterType === 'deadline'"
        >
          <option value selected>Значение</option>
          <option
            v-for="item in filterValueArr"
            :key="'pro'+item.id"
            :value="item.id"
          >{{item.title}}</option>
        </select>
      </div>
      <div class="col-2 p-2">---</div>
      <div class="col-2 p-2">---</div>
      <div class="col-4 p-2">
        <input
          type="text"
          v-model.trim="title"
          @keypress.enter="addItem('napravs')"
          class="form-control form-control-sm border-0 bg-light"
          placeholder="Добавить задачу"
        />
      </div>
    </div>
    <div class="d-flex flex-row flex-wrap">
      <Task
        v-for="task in sortTasks"
        :key="task.id"
        :task="task"
        @edit-item="editItem"
        :settings="settings"
      />
      <Modal :item="item" :napravs="napravs" :projects="projects" />
    </div>
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import createTask from '@/scripts/createTask'
import Task from '@/components/alltasks/Task'
import Modal from '@/components/Modal'

export default {
  components: {
    Task,
    Modal,
  },
  data() {
    return {
      filterType: localStorage.getItem('filterType') || '',
      filterValue: localStorage.getItem('filterValue') || '',
      item: null,
      title: '',
      napravId: '1',
      projectId: '1',
    }
  },
  computed: {
    filterValueArr() {
      switch (this.filterType) {
        case 'status':
          return this.status
          break
        case 'napravId':
          return this.napravs
          break
        case 'projectId':
          return this.projects
          break
        default:
          return []
      }
    },
    status() {
      return this.$store.getters.status
    },
    tasks() {
      return this.$store.getters.tasks
    },
    tasksTodoWork() {
      if (this.settings.showArhived) {
        return this.tasks
      } else {
        return this.tasks.filter(
          (task) => task.status === 'todo' || task.status === 'work'
        )
      }
    },
    tasksFilterType() {
      if (this.filterType) {
        return this.tasksTodoWork.filter((task) => task[this.filterType])
      } else {
        return this.tasksTodoWork
      }
    },
    tasksFilterValue() {
      if (this.filterType && this.filterValue) {
        return this.tasksFilterType.filter(
          (task) => task[this.filterType] === this.filterValue
        )
      } else {
        return this.tasksFilterType
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
      return this.tasksFilterValue.sort((a, b) => {
        if (this.settings.sortBy === 'position') {
          return a.position - b.position
        } else if (this.settings.sortBy === 'date') {
          return new Date(a.date) - new Date(b.date)
        } else if (this.settings.sortBy === 'deadline') {
          return new Date(a.deadline) - new Date(b.deadline)
        }
      })
    },
  },
  methods: {
    editItem({ id, type }) {
      this.item = this.tasks.find((item) => item.id === id)
      let myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
      myModal.show()
    },
    addItem() {
      if (this.title) {
        const type = 'tasks'
        const item = createTask(
          this.title,
          type,
          this.napravId,
          this.projectId,
          this.tasks.length
        )
        this.title = ''
        this.$store.dispatch('addItem', item)
      } else {
        this.error = true
      }
    },
    saveFilterType() {
      localStorage.setItem('filterType', this.filterType)
      this.filterValue = ''
      this.saveFilterValue()
    },
    saveFilterValue() {
      localStorage.setItem('filterValue', this.filterValue)
    },
  },
}
</script>

