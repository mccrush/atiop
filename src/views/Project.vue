<template>
  <div class="h-100">
    <vue-headful
      title="ATIOP Проект"
      description="ATIOP — сервис управления задачами"
    />
    <div class="row p-0 border-bottom">
      <div class="col-4 col-xxl-3 p-2">
        <input
          type="text"
          class="form-control form-control-sm border-0 bg-white"
          placeholder="Название проекта"
        />
      </div>
      <div class="col-3 col-xxl-2 p-2">
        <input
          type="datetime-local"
          class="form-control form-control-sm border-warning"
        />
      </div>
      <div class="col-3 col-xxl-6 p-2"></div>
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
import Modal2 from '@/components/Modal'
import Loading from '@/components/Loading'
import TaskList from '@/components/general/TaskList'

export default {
  components: {
    Modal2,
    Loading,
    vueHeadful,
    TaskList,
  },
  props: {},
  data() {
    return {
      item: null,
      filter: '',
      projectId: this.$route.params.id,
    }
  },
  computed: {
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
  },
  mounted() {
    const slider = document.querySelector('.ower')
    let isDown = false
    let startX
    let scrollLeft

    slider.addEventListener('mousedown', (e) => {
      isDown = true
      slider.classList.add('active')
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    })
    slider.addEventListener('mouseleave', () => {
      isDown = false
      slider.classList.remove('active')
    })
    slider.addEventListener('mouseup', () => {
      isDown = false
      slider.classList.remove('active')
    })
    slider.addEventListener('mousemove', (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = x - startX
      slider.scrollLeft = scrollLeft - walk
    })

    // Filter
    this.filter = localStorage.getItem('at-filter') || ''
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
      localStorage.setItem('at-filter', this.filter)
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
 