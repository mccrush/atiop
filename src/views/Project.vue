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
      <div class="col-12 col-sm-6 col-md-2 col-xxl-1 p-2">
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

      <div
        class="d-none d-sm-block col-sm-4 col-md-8 col-xl-9 col-xxl-10 p-2"
      ></div>
      <div
        class="col-2 col-xl-1 btn-group btn-group-sm p-2"
        role="group"
        aria-label="Group icons"
      >
        <button
          @click="changeViewType('col')"
          type="button"
          class="btn btn-light p-0 pb-1 w-auto"
          :class="{ active: viewType === 'col' }"
        >
          <img
            src="/img/icons_tool/kanban.svg"
            width="16"
            height="16"
            alt="Канбан"
            class="opacity-04"
          />
        </button>
        <button
          @click="changeViewType('table')"
          type="button"
          class="btn btn-light p-0 pb-1 w-auto"
          :class="{ active: viewType === 'table' }"
        >
          <img
            src="/img/icons_tool/list-check.svg"
            width="16"
            height="16"
            alt="Таблица"
            class="opacity-04"
          />
        </button>
      </div>
    </div>
    <!-- Либо Канбан, либо список-таблица -->
    <div v-if="viewType === 'col'" class="row h-100">
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
    <div v-else-if="viewType === 'table'" class="row h-100">
      <div class="col-12">
        <Loading v-if="!projects.length" />
        <TaskListTable
          v-else
          :napravId="napravId"
          :projectId="projectId"
          status=""
          @edit-item="editItem"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import vueHeadful from 'vue-headful'
import Modal2 from '@/components/additional/Modal'
import Loading from '@/components/additional/Loading'
import TaskList from '@/components/lists/ListProjectsTask'
import TaskListTable from '@/components/lists/ListProjectsTaskTable'

export default {
  components: {
    Modal2,
    Loading,
    vueHeadful,
    TaskList,
    TaskListTable,
  },
  data() {
    return {
      item: null,
      filter: localStorage.getItem('project-filter') || '',
      viewType: localStorage.getItem('at-viewtype') || 'col',
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
    changeViewType(type) {
      this.viewType = type
      localStorage.setItem('at-viewtype', type)
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

.opacity-04 {
  opacity: 0.4;
}

.btn-light.active {
  background-color: #dee2e6;
  border-color: #dee2e6;
}
</style>
 