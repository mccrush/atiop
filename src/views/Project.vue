<template>
  <div class="h-100">
    <vue-headful
      title="ATIOP Проект"
      description="ATIOP — сервис управления задачами"
    />
    <div class="row p-0 border-bottom">
      <!-- <div class="col-2 col-xxl-1 p-2">
        <h6 class="mt-1 ms-2">{{ napravTitle }}:</h6>
      </div> -->
      <div class="col-2 col-xxl-1 p-2">
        <Loading v-if="projectsByNapravs && !projectsByNapravs.length" />
        <select
          v-else
          class="form-select form-select-sm"
          v-model="filter"
          @change="saveFilter"
        >
          <option
            v-for="item in projectsByNapravs"
            :key="'proj' + item.id"
            :value="item.id"
          >
            {{ item.title }}
          </option>
        </select>
      </div>

      <div class="col-3 col-xxl-2 p-2">
        <input type="datetime-local" class="form-control form-control-sm" />
      </div>
      <div class="col-5 col-xxl-8 p-2"></div>
      <div
        class="col-2 col-xxl-1 btn-group btn-group-sm p-2"
        role="group"
        aria-label="Basic example"
      >
        <button type="button" class="btn btn-light p-0 w-auto">
          <img
            src="@/assets/icons/layout-three-columns.svg"
            width="24"
            height="24"
            alt="Канбан"
            class="opacity-06"
          />
        </button>
        <button type="button" class="btn btn-light disabled p-0 w-auto">
          <img
            src="@/assets/icons/grid-3x3.svg"
            width="24"
            height="24"
            alt="Таблица"
            class="opacity-06"
          />
        </button>
      </div>
    </div>
    <!-- Либо Канбан, либо список-таблица -->
    <div class="row h-100">
      <div class="d-flex align-items-start pt-2 ower">
        <div class="me-2 rounded-1 border project">
          <h6 class="text-center pt-3 pb-1 m-0 mb-2">К выполнению</h6>
          <Loading v-if="!projects.length" />
          <TaskList
            v-else
            :napravId="napravId"
            :projectId="projectId"
            status="todo"
            @edit-item="editItem"
          />
        </div>
        <div class="me-2 rounded-1 border project">
          <h6 class="text-center pt-3 pb-1 m-0 mb-2">В работе</h6>
          <Loading v-if="!projects.length" />
          <TaskList
            v-else
            :napravId="napravId"
            :projectId="projectId"
            status="work"
            @edit-item="editItem"
          />
        </div>
        <div class="rounded-1 border project">
          <h6 class="text-center pt-3 pb-1 m-0 mb-2">Завершенные</h6>
          <Loading v-if="!projects.length" />
          <TaskList
            v-else
            :napravId="napravId"
            :projectId="projectId"
            status="done"
            @edit-item="editItem"
          />
        </div>
      </div>
      <Modal2 :item="item" :napravs="napravs" :projects="projects" />
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import vueHeadful from 'vue-headful'
import Modal2 from '@/components/additional/Modal'
import Loading from '@/components/additional/Loading'
import TaskList from '@/components/lists/ListProjectsTask'

export default {
  components: {
    Modal2,
    Loading,
    vueHeadful,
    TaskList,
  },
  data() {
    return {
      item: null,
      filter: localStorage.getItem('project-filter') || '',
    }
  },
  beforeMount() {
    if (this.filter !== this.projectId) {
      this.filter = this.projectId
    }
  },
  computed: {
    projectId() {
      return this.$route.params.id
    },
    napravs() {
      return this.$store.getters.napravs
    },
    projects() {
      return this.$store.getters.projects
    },
    napravId() {
      return this.projects.find((proj) => proj.id === this.projectId).napravId
    },
    tasks() {
      return this.$store.getters.tasks
    },
    settings() {
      return this.$store.getters.settings
    },
    projectTitle() {
      return this.projects.find((proj) => proj.id == this.projectId).title
    },
    projectsByNapravs() {
      return this.projects.filter((proj) => proj.napravId === this.napravId)
    },
    napravTitle() {
      return this.napravs.find((naprav) => naprav.id === this.napravId).title
    },
  },
  methods: {
    editItem({ id, type }) {
      if (type === 'tasks') {
        this.item = this.tasks.find((item) => item.id === id)
      } else {
        this.item = this.projects.find((item) => item.id === id)
      }
      let myModal = new Modal(document.getElementById('exampleModal'))
      myModal.show()
    },
    saveFilter() {
      this.$router.push({ path: this.filter })
      localStorage.setItem('project-filter', this.filter)
    },
  },
}
</script>

<style>
.project {
  width: 210px;
  vertical-align: top;
}

.w170 {
  width: 170px;
}

.w220 {
  width: 250px;
}

.elem {
  user-select: none;
}

.opacity-06 {
  opacity: 0.6;
}
</style>
 