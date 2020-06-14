<template>
  <div class="row">
    <div class="col-12 d-flex ower">
      <div v-for="(item, index) in projects" :key="'in'+index" class="p-1">
        <h6
          class="text-center bg-light p-1 rounded-lg m-0 elem"
          :style="'background:'+item.color+' !important'"
          @dblclick.prevent="editItem({id:item.id, type: item.type})"
        >{{item.title}}</h6>
        <ListTasks
          :tasks="tasks"
          :idprojects="item.id"
          :idsphers="item.idsphers"
          :idnapravs="item.idnapravs"
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
  min-height: 500px;
}

.w150 {
  width: 150px;
}

.elem {
  user-select: none;
}
</style>
 