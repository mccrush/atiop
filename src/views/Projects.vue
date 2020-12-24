<template>
  <div class>
    <vue-headful
      title="ATIOP Проекты"
      description="ATIOP — сервис управления задачами"
    />
    <!-- Строка фильтров -->
    <div class="row p-0 border-bottom">
      <div class="col-2 col-xxl-1 p-2">
        <Loading v-if="napravs && !napravs.length" />
        <select
          v-else
          class="form-control form-control-sm"
          v-model="filter"
          @change="saveFilter"
        >
          <option value selected>Все направления</option>
          <option
            v-for="item in napravs"
            :key="'nap' + item.id"
            :value="item.id"
          >
            {{ item.title }}
          </option>
        </select>
      </div>
      <div class="col-3 col-xxl-2 p-2">
        <input
          type="text"
          v-model.trim="titleN"
          @keypress.enter="addItem('napravs')"
          class="form-control form-control-sm border-0 bg-light"
          placeholder="Создать направление"
        />
      </div>
      <div class="col-3 col-xxl-2 p-2">
        <input
          v-if="filter"
          type="text"
          v-model.trim="titleP"
          @keypress.enter="addItem('projects')"
          class="form-control form-control-sm border-0 bg-light"
          :class="{ 'border-danger': error }"
          placeholder="Создать проект"
        />
        <Loading v-if="creating" />
      </div>
      <div class="d-none d-xxl-block col-xxl-5 p-2"></div>
      <div class="col-4 col-xxl-2 p-2">
        <input
          type="search"
          v-model.trim="searchQuery"
          class="form-control form-control-sm border-0 bg-light"
          placeholder="Поиск по проектам"
        />
      </div>
    </div>
    <!-- Конец Строка фильтров -->

    <div class="row overflow-auto my-row-project">
      <h6
        v-if="sortDisplayProjects && sortDisplayProjects.length === 0"
        class="ml-3 mt-2"
        @show="error = true"
      >
        В данном направлении проектов еще нет
      </h6>

      <div
        v-else-if="sortDisplayProjects && sortDisplayProjects.length > 0"
        class="my-width-none"
      >
        <div
          v-for="(item, index) in sortDisplayProjects"
          :key="'in' + index"
          class="mt-2 mr-2 rounded-sm d-inline-block border my-project"
          :style="{
            background: item.color ? item.color + '!important' : '#fff',
          }"
        >
          <h6
            class="text-center pt-3 pr-2 rounded m-0 d-flex flex-row align-items-start my-no-select"
            @dblclick.prevent="editItem({ id: item.id, type: item.type })"
          >
            <div class="w-100 pl-4">{{ item.title }}</div>
            <router-link
              :to="'/project/' + item.id"
              tag="button"
              title="В проект"
              class="btn btn-sm btn-light border p-0 pl-2 pr-2 m-0"
              >In</router-link
            >
          </h6>

          <TaskList
            :napravId="item.napravId"
            :projectId="item.id"
            @edit-item="editItem"
          />
        </div>
      </div>

      <Loading v-else />
      <Modal2 :item="item" :napravs="napravs" :projects="projects" />
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import createTask from '@/scripts/createTask'
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
      filter:
        this.$route.query.naprav || localStorage.getItem('at-filter') || '',
      titleN: '',
      titleP: '',
      creating: false,
      error: false,
      searchQuery: '',
    }
  },
  created() {
    if (this.filter) {
    }
  },
  computed: {
    napravs() {
      return this.$store.getters.napravs
    },
    projects() {
      if (this.searchQuery) {
        return this.$store.getters.projects.filter(
          (item) =>
            item.title.toUpperCase().indexOf(this.searchQuery.toUpperCase()) !=
            -1
        )
      } else {
        return this.$store.getters.projects
      }
    },
    tasks() {
      return this.$store.getters.tasks
    },
    displayProjects() {
      if (this.filter) {
        if (this.settings.showEmpty) {
          return this.projects.filter((proj) => proj.napravId === this.filter)
        } else {
          return this.projects.filter(
            (proj) =>
              proj.napravId === this.filter &&
              this.$store.getters.projectLengthById(proj.id) > 0
          )
        }
      } else {
        if (this.settings.showEmpty) {
          return this.projects
        } else {
          return this.projects.filter(
            (proj) => this.$store.getters.projectLengthById(proj.id) > 0
          )
        }
      }
    },
    sortDisplayProjects() {
      return this.displayProjects.sort((a, b) => {
        return a.position - b.position
      })
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
        if (this.titleN || this.titleP) {
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
            Date.now().toString(),
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
      let myModal = new Modal(document.getElementById('exampleModal'))
      myModal.show()
    },
    saveFilter() {
      this.$router.push({ path: 'projects', query: { naprav: this.filter } })
      localStorage.setItem('at-filter', this.filter)
    },
  },
}
</script>

<style>
.my-row-project {
  height: calc(100vh - 105px) !important;
}
.my-project {
  width: 210px; /* 226 for scroll */
  vertical-align: top;
  max-height: calc(100vh - 135px);
  overflow-y: hidden;
}

.my-no-select {
  user-select: none;
}

.my-opacity-05 {
  opacity: 0.5;
}

.my-width-none {
  width: auto !important;
  max-width: none !important;
}
/* input.w250::placeholder {
  color: #ced4da;
} */

.btn-light {
  background-color: #fff;
  color: #dee2e6;
}

.btn-light:hover {
  background-color: #e2e6ea;
  color: #212529;
}
</style>
 