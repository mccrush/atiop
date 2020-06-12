<template>
  <div class="row">
    <List :list="sphers" type="sphers" @add-item="addItem" @remove-todo="removeItem" />
    <List v-if="idSpher" :list="napravs" type="napravs" />
    <List v-if="idNaprav" :list="projects" type="projects" />
    <List v-if="idProj" :list="etaps" type="etaps" />
    <List v-if="idEtap" :list="tasks" type="tasks" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import List from '@/components/List'

export default {
  name: 'Home',
  components: {
    List
  },
  data() {
    return {
      idSpher: '',
      idNaprav: '',
      idProj: '',
      idEtap: ''
    }
  },
  //computed: mapGettets(['sphers', 'napravs', 'projects', 'etaps', 'tasks']),
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
    }
  },
  methods: {
    addItem(item) {
      this.$store.dispatch('addItem', item)
    },
    removeItem(id, type) {
      this.$store.dispatch('removeItem', id, type)
    }
  },
  watch: {
    idSpher() {
      this.napravs = this.napravs.filter(
        naprav => naprav.idSpher === this.idSpher
      )
      this.projects = this.projects.filter(
        proj => proj.idSpher === this.idSpher
      )
      this.etaps = this.etaps.filter(etap => etap.idSpher === this.idSpher)
      this.tasks = this.tasks.filter(task => task.idSpher === this.idSpher)
    },
    idNaprav() {
      this.projects = this.projects.filter(
        proj => proj.idNaprav === this.idNaprav
      )
      this.etaps = this.etaps.filter(etap => etap.idNaprav === this.idNaprav)
      this.tasks = this.tasks.filter(task => task.idNaprav === this.idNaprav)
    },
    idProj() {
      this.etaps = this.etaps.filter(etap => etap.idProj === this.idProj)
      this.tasks = this.tasks.filter(task => task.idProj === this.idProj)
    },
    idEtap() {
      this.tasks = this.tasks.filter(task => task.idEtap === this.idEtap)
    }
  }
}
</script>
