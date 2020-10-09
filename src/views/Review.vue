<template>
  <div class>
    <vue-headful
      title="ATIOP Обзор проектов"
      description="ATIOP — сервис управления задачами"
    />

    <div class="row p-0 border-bottom">
      <div class="col-2 col-xxl-2 p-2">
        <div class="bg-white border rounded-sm text-center small w-100 p-1">
          Направлений
          <span class="badge bg-info ml-1">{{ napravs.length }}</span>
        </div>
      </div>
      <div class="col-2 col-xxl-2 p-2">
        <div class="bg-white border rounded-sm text-center small w-100 p-1">
          Проектов
          <span class="badge bg-secondary ml-1">{{ projects.length }}</span>
        </div>
      </div>
      <div class="col-3 col-xxl-2 p-2">
        <div class="bg-white border rounded-sm text-center small w-100 p-1">
          Задач
          <span class="badge bg-light text-dark ml-1 mr-1">{{
            tasksTodo.length
          }}</span>
          <span class="badge bg-warning mr-1">{{ tasksWork.length }}</span>
          <span class="badge bg-secondary mr-1">{{ tasksDone.length }}</span>
          <span class="badge bg-light text-dark"
            ><strong>{{ tasks.length }}</strong></span
          >
        </div>
      </div>
    </div>

    <ListNapravGeneral
      :napravs="sortNapravs"
      :projects="projects"
      @edit-item="editItem"
    />
    <Modal2 :item="item" :napravs="napravs" :projects="projects" />
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import vueHeadful from 'vue-headful'
import ListNapravGeneral from '@/components/general/ListNapravGeneral'
import Modal2 from '@/components/Modal'

export default {
  components: {
    ListNapravGeneral,
    Modal2,
    vueHeadful,
  },
  data() {
    return {
      item: null,
    }
  },
  computed: {
    napravs() {
      return this.$store.getters.napravs
    },
    sortNapravs() {
      return this.napravs.sort((a, b) => {
        return a.position - b.position
      })
    },
    projects() {
      return this.$store.getters.projects
    },
    tasks() {
      return this.$store.getters.tasks
    },
    tasksTodo() {
      return this.tasks.filter((task) => task.status === 'todo')
    },
    tasksWork() {
      return this.tasks.filter((task) => task.status === 'work')
    },
    tasksDone() {
      return this.tasks.filter((task) => task.status === 'done')
    },
  },
  methods: {
    editItem({ id, type }) {
      if (type === 'projects') {
        this.item = this.projects.find((item) => item.id === id)
      } else if (type === 'napravs') {
        this.item = this.napravs.find((item) => item.id === id)
      } else {
        this.item = this.tasks.find((item) => item.id === id)
      }
      let myModal = new Modal(document.getElementById('exampleModal'))
      myModal.show()
    },
  },
}
</script>

<style>
.my-no-select {
  user-select: none;
}

.ower {
  overflow: auto;
  margin-bottom: 59px;
}
</style>