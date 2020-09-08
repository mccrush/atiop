<template>
  <div>
    <div class="row p-0 border-bottom">
      <div class="col-2 p-2">
        <select class="form-control form-control-sm" v-model="filterType" @change="saveFilterType">
          <option value selected>Фильтр</option>
          <option value="naprav">По направлениям</option>
          <option value="proj">По проектам</option>
          <option value="date">С датами</option>
          <option value="deadline">С дедлайнами</option>
        </select>
      </div>
      <div class="col-2 p-2">---</div>
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
      <Task v-for="task in tasks" :key="task.id" :task="task" @edit-item="editItem" />
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
      filterId: localStorage.getItem('filterId') || '',
      item: null,
      title: '',
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks
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
      if (type === 'tasks') {
        this.item = this.tasks.find((item) => item.id === id)
      } else {
        this.item = this.projects.find((item) => item.id === id)
      }
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
          idnapravs: '',
          idprojects: '',
          status: 'todo',
          position: this.tasks.length + 1, // По умолчанию в конец списка
          color: '', // У задач нет цвета
          date: '',
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
  },
}
</script>

