<template>
  <div class="h-100">
    <vue-headful title="ATIOP Проекты" description="ATIOP — сервис управления задачами" />
    <div class="row">
      <div class="col-12 p-2 border-bottom d-flex align-content-center height-31">
        <h6 class="m-1">Направление:</h6>
        <Loading v-if="!napravs.length" />
        <select
          v-else
          class="form-control form-control-sm ml-2 w150"
          v-model="filter"
          @change="saveFilter"
        >
          <option value selected>Все</option>
          <option v-for="item in napravs" :key="'nap'+item.id" :value="item.id">{{item.title}}</option>
        </select>
      </div>
    </div>
    <div class="row h-100">
      <Loading v-if="!displayProjects.length" />
      <div v-else class="col-12 d-flex ower">
        <div v-for="(item, index) in displayProjects" :key="'in'+index" class="p-1">
          <h6
            class="text-center bg-light p-2 rounded m-0 elem d-flex flex-row align-items-stretch"
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
            :tasks="tasks"
            :idnapravs="item.idnapravs"
            :idprojects="item.id"
            @edit-item="editItem"
          />
        </div>
      </div>
      <Modal :item="item" />
    </div>
  </div>
</template>

<script>
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
      loading: false,
      item: null,
      filter: ''
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
    displayProjects() {
      if (this.filter) {
        if (this.settings.showEmpty) {
          this.projects.filter(proj => proj.idnapravs === this.filter)
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
    this.filter = localStorage.getItem('filter') || ''
  },
  methods: {
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
    }
  }
}
</script>

<style>
.w150 {
  width: 150px;
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
 