<template>
  <div>
    <vue-headful
      title="ATIOP Пользователь"
      description="ATIOP — сервис управления задачами"
    />
    <div class="row p-0 border-bottom">
      <div class="col-2 col-xxl-1 p-2">
        <select
          class="form-select form-select-sm"
          v-model="filterTypeModel"
          @change="saveFilterType"
        >
          <option value selected>Без фильтра</option>
          <option value="status">По статусу</option>
          <option value="napravId">С направлениями</option>
          <option value="projectId">С проектами</option>
          <option value="date">С датами</option>
          <option value="deadline">С дедлайнами</option>
          <option value="price">С ценой</option>
          <option value="time">С временем</option>
        </select>
      </div>
      <div class="col-2 col-xxl-1 p-2">
        <select
          class="form-select form-select-sm"
          v-model="filterValueModel"
          @change="saveFilterValue"
          :disabled="
            !filterType ||
            filterType === 'date' ||
            filterType === 'deadline' ||
            filterType === 'price' ||
            filterType === 'time'
          "
        >
          <option value selected>Без значения</option>
          <option
            v-for="item in filterValueArr"
            :key="'pro' + item.id"
            :value="item.id"
          >
            {{ item.title }}
          </option>
        </select>
      </div>
      <div class="col-4 col-xxl-2 p-2">
        <input
          type="text"
          v-model.trim="title"
          @keypress.enter="addItem('napravs')"
          class="form-control form-control-sm border-0 bg-light"
          placeholder="Добавить задачу"
        />
      </div>
      <div class="d-none d-xxl-block col-xxl-6 p-2"></div>
      <div class="col-4 col-xxl-2 p-2">
        <input
          type="search"
          v-model.trim="searchQuery"
          class="form-control form-control-sm border-0 bg-light"
          placeholder="Поиск по задачам"
        />
      </div>
    </div>
    <div class="d-flex flex-row flex-wrap">
      <Loading v-if="sortTasks && !sortTasks.length" />
      <Task
        v-for="task in sortTasks"
        :key="task.id"
        :task="task"
        @edit-item="editItem"
        :settings="settings"
      />
      <Modal2 :item="item" :napravs="napravs" :projects="projects" />
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import createTask from '@/scripts/createTask'
import Task from '@/components/alltasks/Task'
import Modal2 from '@/components/Modal'
import Loading from '@/components/Loading'
import vueHeadful from 'vue-headful'

export default {
  components: {
    Task,
    Modal2,
    Loading,
    vueHeadful,
  },
  data() {
    return {
      filterTypeModel: localStorage.getItem('at-filterType') || '',
      filterValueModel: localStorage.getItem('at-filterValue') || '',
      item: null,
      title: '',
      napravId: '',
      projectId: '',
      searchQuery: '',
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
      if (this.searchQuery) {
        return this.$store.getters.tasks.filter(
          (item) =>
            item.title.toUpperCase().indexOf(this.searchQuery.toUpperCase()) !=
            -1
        )
      } else {
        return this.$store.getters.tasks
      }
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
      if (this.filterTypeModel) {
        return this.tasksTodoWork.filter((task) => task[this.filterTypeModel])
      } else {
        return this.tasksTodoWork
      }
    },
    tasksFilterValue() {
      if (this.filterTypeModel && this.filterValueModel) {
        return this.tasksFilterType.filter(
          (task) => task[this.filterTypeModel] === this.filterValueModel
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
        if (this.settings.sortUp) {
          if (this.settings.sortBy === 'position') {
            return a.position - b.position
          } else if (this.settings.sortBy === 'date') {
            return new Date(a.dateCreate) - new Date(b.dateCreate)
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
            return new Date(b.dateCreate) - new Date(a.dateCreate)
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
    filterType() {
      return this.$store.getters.filterType
    },
    filterValue() {
      return this.$store.getters.filterValue
    },
  },
  // Использовать в Админских целях для добавления новых свойств задачам
  // mounted() {
  //   this.addNewField()
  // },
  methods: {
    // Испльзуется в админских целях, для добавления новых свойств уже существующих задач
    // addNewField() {
    //   this.tasks.forEach((item) => {
    //     this.$store.dispatch('addNewField', item.id)
    //   })
    // },
    editItem({ id, type }) {
      this.item = this.tasks.find((item) => item.id === id)
      let myModal = new Modal(document.getElementById('exampleModal'))
      myModal.show()
    },
    addItem() {
      if (this.title) {
        const type = 'tasks'

        const item = createTask(
          Date.now().toString(),
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
      if (this.filterTypeModel !== 'status') {
        this.$store.commit('updateSettingsShow', { name: this.filterTypeModel })
      }

      this.$store.commit('updateFilter', {
        filterType: this.filterTypeModel,
        filterValue: '',
      })
      this.filterValueModel = ''
      this.saveFilterValue()
    },
    saveFilterValue() {
      if (
        this.filterTypeModel === 'status' &&
        this.filterValueModel === 'done'
      ) {
        this.$store.commit('updateSettingsShow', { name: 'showArhived' })
      }
      this.$store.commit('updateFilter', {
        filterType: this.filterTypeModel,
        filterValue: this.filterValueModel,
      })
    },
  },
  watch: {
    filterType() {
      this.filterTypeModel = this.filterType
    },
    filterValue() {
      this.filterValueModel = this.filterValue
    },
  },
}
</script>

