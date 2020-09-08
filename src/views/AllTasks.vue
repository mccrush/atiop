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
          :disabled="!filterType"
        >
          <option value selected>Статус</option>
          <option value="todo">Новые</option>
          <option value="work">В работе</option>
          <option value="done">Завершенные</option>
        </select>
      </div>
      <div class="col-2 p-2">---</div>
      <div class="col-2 p-2">---</div>
      <div class="col-4 p-2">
        <input
          type="text"
          v-model="title"
          @keypress.enter="addItem('napravs')"
          class="form-control form-control-sm border-0 bg-light"
          placeholder="Добавить задачу"
        />
      </div>
    </div>
    <div class="d-flex flex-row flex-wrap">
      <Task v-for="task in tasksFilterValue" :key="task.id" :task="task" @edit-item="editItem" />
      <Modal :item="item" />
    </div>
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
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
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks
    },
    tasksFilterType() {
      if (this.filterType) {
        return this.tasks.filter((task) => task[this.filterType])
      } else {
        return this.tasks
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
  },
  methods: {
    editItem({ id, type }) {
      this.item = this.tasks.find((item) => item.id === id)
      let myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
      myModal.show()
    },
    addItem() {
      if (this.title.trim()) {
        const item = {
          title: this.title.trim(),
          desc: '',
          id: Date.now().toString(),
          type: 'tasks',
          napravId: '',
          napravTitle: '',
          projectId: '',
          projectTitle: '',
          status: 'todo',
          position: this.tasks.length + 1, // По умолчанию в конец списка
          color: '', // У задач нет цвета
          date: '',
          deadline: '',
        }
        this.title = ''
        this.$store.dispatch('addItem', item)
      } else {
        this.error = true
      }
    },
    saveFilterType() {
      localStorage.setItem('filterType', this.filterType)
    },
    saveFilterValue() {
      localStorage.setItem('filterValue', this.filterValue)
    },
  },
}
</script>

