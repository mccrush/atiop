<template>
  <div class="row">
    <List :sphers="sphers" :type="sphers" @add-item="addItem" />
    <List :napravs="napravs" :type="napravs" />
    <List :projects="projects" :type="projects" />
    <List :etaps="etaps" :type="etaps" />
    <List :tasks="tasks" :type="tasks" />
  </div>
</template>

<script>
import { mapGettets, mapMutations } from 'vuex'
import List from '@/components/List'

export default {
  name: 'Home',
  components: {
    List
  },
  data() {
    return {
      aliasSpher: '',
      aliasNaprav: '',
      aliasProj: '',
      aliasEtap: ''
    }
  },
  computed: {
    ...mapGettets(['sphers', 'napravs', 'projects', 'etaps', 'tasks'])
  },
  methods: {
    ...mapMutations(['addItem']),
    addItem(item) {
      this.addItem(item)
    }
  },
  watch: {
    aliasSpher() {
      this.napravs = this.napravs.filter(
        naprav => naprav.spher === this.aliasSpher
      )
      this.projects = this.projects.filter(
        proj => proj.spher === this.aliasSpher
      )
      this.etaps = this.etaps.filter(etap => etap.spher === this.aliasSpher)
      this.tasks = this.tasks.filter(task => task.spher === this.aliasSpher)
    },
    aliasNaprav() {
      this.projects = this.projects.filter(
        proj => proj.naprav === this.aliasNaprav
      )
      this.etaps = this.etaps.filter(etap => etap.naprav === this.aliasNaprav)
      this.tasks = this.tasks.filter(task => task.naprav === this.aliasNaprav)
    },
    aliasProj() {
      this.etaps = this.etaps.filter(etap => etap.proj === this.aliasProj)
      this.tasks = this.tasks.filter(task => task.proj === this.aliasProj)
    },
    aliasEtap() {
      this.tasks = this.tasks.filter(task => task.etap === this.aliasEtap)
    }
  }
}
</script>
