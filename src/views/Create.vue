<template>
  <div class="row">
    <List :list="sphers" type="sphers" @select-item="selectItem" />
    <List
      v-if="idsphers"
      :list="dispalyNapravs"
      :idsphers="idsphers"
      type="napravs"
      @select-item="selectItem"
    />
    <List
      v-if="idnapravs"
      :list="displayProjects"
      :idsphers="idsphers"
      :idnapravs="idnapravs"
      type="projects"
      @select-item="selectItem"
    />
    <List
      v-if="idprojects"
      :list="displayTasks"
      :idsphers="idsphers"
      :idnapravs="idnapravs"
      :idprojects="idprojects"
      type="tasks"
      @select-item="selectItem"
    />
  </div>
</template>

<script>
import List from '@/components/List'

export default {
  name: 'Home',
  components: {
    List
  },
  data() {
    return {
      idsphers: '',
      idnapravs: '',
      idprojects: '',
      idtasks: ''
    }
  },
  mounted() {
    this.idsphers = localStorage.getItem('idsphers') || ''
    this.idnapravs = localStorage.getItem('idnapravs') || ''
    this.idprojects = localStorage.getItem('idprojects') || ''
  },
  computed: {
    sphers() {
      return this.$store.getters.sphers
    },
    napravs() {
      return this.$store.getters.napravs
    },
    projects() {
      return this.$store.getters.projects
    },
    tasks() {
      return this.$store.getters.tasks
    },
    dispalyNapravs() {
      return this.napravs.filter(item => {
        if (!this.idsphers) {
          return false
        } else {
          return item.idsphers === this.idsphers
        }
      })
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
    selectItem({ id, type, color }) {
      this['id' + type] = id
      localStorage.setItem('id' + type, id)
      localStorage.setItem('color', color)
      switch (type) {
        case 'sphers':
          this.idnapravs = ''
          this.idprojects = ''
          localStorage.setItem('idnapravs', '')
          localStorage.setItem('idprojects', '')
          break
        case 'napravs':
          this.idprojects = ''
          localStorage.setItem('idprojects', '')
          break
        default:
      }
    }
  }
}
</script>
