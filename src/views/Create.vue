<template>
  <div class="row">
    <vue-headful title="ATIOP Создание объектов" description="ATIOP — сервис управления задачами" />
    <List :list="napravs" type="napravs" @select-item="selectItem" />
    <List
      v-if="idnapravs"
      :list="displayProjects"
      :idnapravs="idnapravs"
      type="projects"
      @select-item="selectItem"
    />
    <div>
      <h5 v-if="idprojects" class="text-center mt-2">Задачи</h5>
      <ListTasks
        v-if="idprojects"
        :tasks="tasks"
        :idnapravs="idnapravs"
        :idprojects="idprojects"
        @edit-item="editItem"
      />
    </div>

    <Modal :item="item" />
  </div>
</template>

<script>
import $ from 'jquery'
import vueHeadful from 'vue-headful'
import List from '@/components/List'
import ListTasks from '@/components/projects/ListTasks'
import Modal from '@/components/Modal'

export default {
  name: 'Create',
  components: {
    List,
    ListTasks,
    Modal,
    vueHeadful
  },
  data() {
    return {
      idnapravs: '',
      idprojects: '',
      idtasks: '',
      color: '#ffffff',
      item: null
    }
  },
  mounted() {
    this.idnapravs = localStorage.getItem('idnapravs') || ''
    this.idprojects = localStorage.getItem('idprojects') || ''
    //console.log('uid:', auth.currentUser.uid);
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
      return this.projects.filter(item => {
        if (!this.idnapravs) {
          return false
        } else {
          return item.idnapravs === this.idnapravs
        }
      })
    },
    displayTasks() {
      return this.tasks.filter(item => {
        if (!this.idprojects) {
          return false
        } else {
          return item.idprojects === this.idprojects
        }
      })
    }
  },
  methods: {
    selectItem({ id, type }) {
      this['id' + type] = id
      localStorage.setItem('id' + type, id)
      switch (type) {
        case 'napravs':
          this.idprojects = ''
          localStorage.setItem('idprojects', '')
          break
        default:
      }
    },
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
.elem {
  user-select: none;
}
</style>
