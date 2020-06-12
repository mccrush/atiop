<template>
  <div class="row">
    <List
      :list="sphers"
      type="sphers"
      @add-item="addItem"
      @remove-item="removeItem"
      @select-item="selectItem"
    />
    <List
      v-if="idsphers"
      :list="dispalyNapravs"
      :idsphers="idsphers"
      type="napravs"
      @add-item="addItem"
      @remove-item="removeItem"
      @select-item="selectItem"
    />
    <List
      v-if="idnapravs"
      :list="displayProjects"
      :idsphers="idsphers"
      :idnapravs="idnapravs"
      type="projects"
      @add-item="addItem"
      @remove-item="removeItem"
      @select-item="selectItem"
    />
    <List
      v-if="idprojects"
      :list="displayEtaps"
      :idsphers="idsphers"
      :idnapravs="idnapravs"
      :idprojects="idprojects"
      type="etaps"
      @add-item="addItem"
      @remove-item="removeItem"
      @select-item="selectItem"
    />
    <List
      v-if="idetaps"
      :list="displayTasks"
      :idsphers="idsphers"
      :idnapravs="idnapravs"
      :idprojects="idprojects"
      :idetaps="idetaps"
      type="tasks"
      @add-item="addItem"
      @remove-item="removeItem"
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
      idetaps: '',
      idtasks: ''
    }
  },
  mounted() {
    this.idsphers = localStorage.getItem('idsphers') || ''
    this.idnapravs = localStorage.getItem('idnapravs') || ''
    this.idprojects = localStorage.getItem('idprojects') || ''
    this.idetaps = localStorage.getItem('idetaps') || ''
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
    etaps() {
      return this.$store.getters.etaps
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
    displayEtaps() {
      return this.etaps.filter(item => {
        if (!this.idprojects) {
          return false
        } else {
          return item.idprojects === this.idprojects
        }
      })
    },
    displayTasks() {
      return this.tasks.filter(item => {
        if (!this.idetaps) {
          return false
        } else {
          return item.idetaps === this.idetaps
        }
      })
    }
  },
  methods: {
    addItem(item) {
      this.$store.dispatch('addItem', item)
    },
    removeItem({ id, type }) {
      this.$store.dispatch('removeItem', { id, type })
    },
    selectItem({ id, type }) {
      this['id' + type] = id
      localStorage.setItem('id' + type, id)
      switch (type) {
        case 'sphers':
          this.idnapravs = ''
          this.idprojects = ''
          this.idetaps = ''
          break
        case 'napravs':
          this.idprojects = ''
          this.idetaps = ''
          break
        case 'projects':
          this.idetaps = ''
          break
        default:
      }
    }
  }
}
</script>
