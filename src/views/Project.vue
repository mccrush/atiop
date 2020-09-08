<template>
  <div class="h-100">
    <vue-headful title="ATIOP Проект" description="ATIOP — сервис управления задачами" />
    <div class="row h-100">
      <div class="col-12 d-flex ower pt-2">
        <div class="w220 mr-2">
          <h6 class="text-center pt-2 rounded m-0 mb-2">К выполнению</h6>
          <Loading v-if="!tasks.length" />
          <ListTasks
            v-else
            :tasks="tasksTodo"
            :napravId="napravId"
            :projectId="projectId"
            status="todo"
            @edit-item="editItem"
          />
        </div>
        <div class="w220 mr-2">
          <h6 class="text-center pt-2 rounded m-0 mb-2">В работе</h6>
          <Loading v-if="!tasks.length" />
          <ListTasks
            v-else
            :tasks="tasksWork"
            :napravId="napravId"
            :projectId="projectId"
            hideform="true"
            status="work"
            @edit-item="editItem"
          />
        </div>
        <div class="w220">
          <h6 class="text-center pt-2 rounded m-0 mb-2">Завершенные</h6>
          <Loading v-if="!tasks.length" />
          <ListTasks
            v-else
            :tasks="tasksDone"
            :napravId="napravId"
            :projectId="projectId"
            hideform="true"
            status="done"
            @edit-item="editItem"
          />
        </div>
      </div>
      <Modal :item="item" :napravs="napravs" :projects="projects" />
    </div>
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import vueHeadful from 'vue-headful'
import ListTasks from '@/components/projects/ListTasks'
import Modal from '@/components/Modal'
import Loading from '@/components/Loading'

export default {
  components: {
    ListTasks,
    Modal,
    Loading,
    vueHeadful,
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
    tasksTodo() {
      return this.tasks.filter((task) => task.status === 'todo')
    },
    tasksWork() {
      return this.tasks.filter((task) => task.status === 'work')
    },
    tasksDone() {
      return this.tasks.filter((task) => task.status === 'done')
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
    this.filter = localStorage.getItem('filter') || ''
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
    saveFilter() {
      localStorage.setItem('filter', this.filter)
    },
  },
}
</script>

<style>
.w170 {
  width: 170px;
}

.w220 {
  width: 250px;
}

.elem {
  user-select: none;
}
</style>
 