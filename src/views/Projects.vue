<template>
  <div class="h-100">
    <vue-headful title="ATIOP Проекты" description="ATIOP — сервис управления задачами" />
    <div class="row">
      <div class="col-12 p-2 border-bottom d-flex align-content-center height-31">
        <h6 class="m-1">Направление:</h6>
        <Loading v-if="napravs && !napravs.length" />
        <select
          v-else
          class="form-control form-control-sm ml-2 w150"
          v-model="filter"
          @change="saveFilter"
        >
          <option value selected>Все</option>
          <option v-for="item in napravs" :key="'nap'+item.id" :value="item.id">{{item.title}}</option>
        </select>
        <input
          v-if="filter"
          type="text"
          v-model="title"
          @keypress.enter="addItem"
          class="form-control form-control-sm border-0 bg-light ml-2 w250"
          placeholder="Создать проект"
        />
        <Loading v-if="creating" />
      </div>
    </div>
    <div class="row h-100">
      <Loading v-if="displayProjects && !displayProjects.length" />
      <div v-else class="col-12 d-flex ower">
        <div v-for="(item, index) in displayProjects" :key="'in'+index" class="mt-2 mr-3 w250">
          <h6
            class="text-center bg-light p-2 rounded m-0 mb-2 elem d-flex flex-row align-items-stretch"
            :style="{'background': item.color ? item.color+'!important' : '#f8f9fa'}"
            @dblclick.prevent="editItem({id:item.id, type: item.type})"
            :title="'Count: '+ item.length"
          >
            <div class="w-100">{{item.title}}</div>
            <router-link
              :to="'/project/'+item.id"
              tag="a"
              class="flex-shrink-1 align-self-stretch pl-1 pr-1 opacity-06"
            >
              <img src="@/assets/icons/folder-symlink.svg" width="16" height="16" alt />
            </router-link>
          </h6>
          <ListTasks
            :tasks="tasksTodoWork"
            :idnapravs="item.idnapravs"
            :idprojects="item.id"
            @edit-item="editItem"
          />
          <ListTasks
            v-if="settings.showArhived"
            :tasks="tasksDone"
            :idnapravs="item.idnapravs"
            :idprojects="item.id"
            hideform="true"
            @edit-item="editItem"
          />
        </div>
      </div>
      <Modal :item="item" />
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import vueHeadful from 'vue-headful'
import ListTasks from '@/components/projects/ListTasks'
import Modal from '@/components/Modal'
import Loading from '@/components/Loading'

export default {
  components: {
    ListTasks,
    Modal,
    Loading,
    vueHeadful
  },
  props: {},
  data() {
    return {
      item: null,
      filter: localStorage.getItem('filter') || '',
      title: '',
      type: 'projects',
      list: { length: 0 },
      creating: false
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
        task => task.status === 'todo' || task.status === 'work'
      )
    },
    tasksDone() {
      return this.tasks.filter(task => task.status === 'done')
    },
    displayProjects() {
      if (this.filter) {
        if (this.settings.showEmpty) {
          return this.projects.filter(proj => proj.idnapravs === this.filter)
        } else {
          return this.projects.filter(
            proj => proj.idnapravs === this.filter && proj.length > 0
          )
        }
      } else {
        if (this.settings.showEmpty) {
          return this.projects
        } else {
          return this.projects.filter(proj => proj.length > 0)
        }
      }
    },
    settings() {
      return this.$store.getters.settings
    }
  },
  async mounted() {
    // Горизонтальная прокрутка мышкой
    function scrollMouse() {
      const slider = document.querySelector('.ower')
      let isDown = false
      let startX
      let scrollLeft

      slider.addEventListener('mousedown', e => {
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
      slider.addEventListener('mousemove', e => {
        if (!isDown) return
        e.preventDefault()
        const x = e.pageX - slider.offsetLeft
        const walk = x - startX
        slider.scrollLeft = scrollLeft - walk
      })
    }

    // Filter
    //this.filter = localStorage.getItem('filter') || ''
  },
  methods: {
    async addItem() {
      try {
        if (this.title.trim()) {
          this.creating = true
          const item = {
            title: this.title.trim(),
            desc: '',
            id: Date.now().toString(),
            type: this.type,
            idnapravs: this.filter || '',
            idprojects: this.idprojects || '',
            length: 0,
            status: 'todo',
            position: this.list.length + 1,
            color: '',
            date: this.getDateNow()
          }

          await this.$store.dispatch('addItem', item)
        } else {
          this.error = true
        }
      } catch (err) {
        console.log('Ошибка:', err.message)
        this.$store.commit('addMessage', {
          text: 'Ошибка: ' + err.code,
          type: 'bg-danger'
        })
      } finally {
        this.title = ''
        this.creating = false
      }
    },
    editItem({ id, type }) {
      if (type === 'tasks') {
        this.item = this.tasks.find(item => item.id === id)
      } else {
        this.item = this.projects.find(item => item.id === id)
      }
      $('#exampleModal').modal('show')
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
    }
  }
}
</script>

<style>
.w150 {
  width: 150px;
}

.w250 {
  width: 230px;
}

.height-31 {
  height: 48px;
}

.elem {
  user-select: none;
}

.opacity-06 {
  opacity: 0.6;
}
</style>
 