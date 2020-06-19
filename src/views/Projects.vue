<template>
  <div class="row h-100">
    <div class="col-12 d-flex ower">
      <div v-for="(item, index) in projects" :key="'in'+index" class="p-1">
        <h6
          class="text-center bg-light p-2 rounded m-0 elem"
          @dblclick.prevent="editItem({id:item.id, type: item.type})"
        >{{item.title}}</h6>
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
</template>

<script>
import $ from 'jquery'
import ListTasks from '@/components/projects/ListTasks'
import Modal from '@/components/Modal'

export default {
  components: {
    ListTasks,
    Modal
  },
  props: {},
  data() {
    return {
      item: null
    }
  },
  computed: {
    projects() {
      return this.$store.getters.projects
    },
    tasks() {
      return this.$store.getters.tasks
    },
    displayProjects() {
      // Додумать, чтоб не выводить пустые проекты. И надо ли так делать
      return this.projects.filter(proj => proj.childs > 0)
    }
  },
  mounted() {
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
  },
  methods: {
    editItem({ id, type }) {
      if (type === 'tasks') {
        this.item = this.tasks.find(item => item.id === id)
      } else {
        this.item = this.projects.find(item => item.id === id)
      }
      $('#exampleModal').modal('show')
    }
  }
}
</script>

<style>
.ower {
  overflow: auto;
  margin-bottom: 59px;
}

.w150 {
  width: 150px;
}

.elem {
  user-select: none;
}
</style>
 