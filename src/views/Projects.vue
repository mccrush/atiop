<template>
  <div class>
    <vue-headful title="ATIOP Проекты" description="ATIOP — сервис управления задачами" />
    <div class="row p-0 border-bottom">
      <!-- <h6 class="m-1">Направление:</h6> -->
      <div class="col-2 p-2">
        <Loading v-if="napravs && !napravs.length" />
        <select v-else class="form-control form-control-sm" v-model="filter" @change="saveFilter">
          <option value selected>Все направления</option>
          <option v-for="item in napravs" :key="'nap'+item.id" :value="item.id">{{item.title}}</option>
        </select>
      </div>
      <div class="col-3 p-2">
        <input
          type="text"
          v-model.trim="titleN"
          @keypress.enter="addItem('napravs')"
          class="form-control form-control-sm border-0 bg-light"
          placeholder="Создать направление"
        />
      </div>
      <div class="col-3 p-2">
        <input
          v-if="filter"
          type="text"
          v-model.trim="titleP"
          @keypress.enter="addItem('projects')"
          class="form-control form-control-sm border-0 bg-light"
          :class="{'border-danger': error}"
          placeholder="Создать проект"
        />
        <Loading v-if="creating" />
      </div>
    </div>
    <div class="row overflow-auto row-project">
      <h6
        v-if="displayProjects && displayProjects.length === 0"
        class="ml-3 mt-2"
        @show="error = true"
      >В данном направлении проектов еще нет</h6>

      <div v-else-if="displayProjects && displayProjects.length > 0" class="width-none">
        <div
          v-for="(item, index) in displayProjects"
          :key="'in'+index"
          class="mt-2 mr-2 border rounded-sm d-inline-block project"
        >
          <h6
            class="text-center p-2 rounded m-0 mb-2 elem d-flex flex-row align-items-stretch"
            :style="{'background': item.color ? item.color+'!important' : '#fff'}"
            @dblclick.prevent="editItem({id:item.id, type: item.type})"
            :title="'Count: '+ item.length"
          >
            <div class="w-100">{{item.title}}</div>
            <router-link
              :to="'/project/'+item.id"
              tag="a"
              title="В проект"
              class="flex-shrink-1 align-self-stretch pl-1 pr-1 opacity-06"
            >
              <img src="@/assets/icons/box-arrow-in-right.svg" width="16" height="16" alt />
            </router-link>
          </h6>
          <ListTasks
            :tasks="tasksTodoWork"
            :napravId="item.napravId"
            :projectId="item.id"
            :napravs="napravs"
            :projects="projects"
            @edit-item="editItem"
          />
          <ListTasks
            v-if="settings.showArhived"
            :tasks="tasksDone"
            :napravId="item.napravId"
            :projectId="item.id"
            :napravs="napravs"
            :projects="projects"
            hideform="true"
            @edit-item="editItem"
          />
        </div>
      </div>

      <Loading v-else />
      <Modal :item="item" :napravs="napravs" :projects="projects" />
    </div>
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import createTask from '@/scripts/createTask'
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
      filter: localStorage.getItem('filter') || '',
      titleN: '',
      titleP: '',
      creating: false,
      error: false,
    }
  },
  computed: {
    napravs() {
      return this.$store.getters.napravs
    },
    projects() {
      return this.$store.getters.projects
    },
    tasks() {
      return this.$store.getters.tasks
    },
    tasksTodoWork() {
      return this.tasks.filter(
        (task) => task.status === 'todo' || task.status === 'work'
      )
    },
    tasksDone() {
      return this.tasks.filter((task) => task.status === 'done')
    },
    displayProjects() {
      if (this.filter) {
        if (this.settings.showEmpty) {
          return this.projects.filter((proj) => proj.napravId === this.filter)
        } else {
          return this.projects.filter(
            (proj) => proj.napravId === this.filter && proj.length > 0
          )
        }
      } else {
        if (this.settings.showEmpty) {
          return this.projects
        } else {
          return this.projects.filter((proj) => proj.length > 0)
        }
      }
    },
    settings() {
      return this.$store.getters.settings
    },
  },
  async mounted() {
    // Горизонтальная прокрутка мышкой
    function scrollMouse() {
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
    }
  },
  methods: {
    async addItem(type) {
      try {
        if (this.titleN.trim() || this.titleP.trim()) {
          this.creating = true
          const title =
            type === 'napravs'
              ? this.titleN
              : type === 'projects'
              ? this.titleP
              : this.title
          const napravId =
            type === 'projects'
              ? this.filter
              : type === 'tasks'
              ? this.napravId
              : ''

          const item = createTask(
            title,
            type,
            napravId,
            this.projectId,
            this.tasks.length
          )

          await this.$store.dispatch('addItem', item)
        } else {
          this.error = true
        }
      } catch (err) {
        console.log('Ошибка:', err.message)
        this.$store.commit('addMessage', {
          text: 'Ошибка: ' + err.code,
          type: 'bg-danger',
        })
      } finally {
        this.titleN = ''
        this.titleP = ''
        this.creating = false
      }
    },
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
    getDateNow() {
      return (
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1 > 9
          ? new Date().getMonth() + 1
          : '0' + (new Date().getMonth() + 1)) +
        '-' +
        (new Date().getDate() + 3 > 9
          ? new Date().getDate() + 3
          : '0' + (new Date().getDate() + 3)) +
        'T' +
        (new Date().getHours() > 9
          ? new Date().getHours()
          : '0' + new Date().getHours()) +
        ':' +
        (new Date().getMinutes() > 9
          ? new Date().getMinutes()
          : '0' + new Date().getMinutes())
      )
    },
  },
}
</script>

<style>
.row-project {
  height: calc(100vh - 105px) !important;
}
.project {
  width: 210px;
  vertical-align: top;
}

.elem {
  user-select: none;
}

.opacity-06 {
  opacity: 0.5;
}

.width-none {
  width: auto !important;
  max-width: none !important;
}
/* input.w250::placeholder {
  color: #ced4da;
} */
</style>
 