<template>
  <div class="row">
    <div class="col-12 d-flex ower">
      <div v-for="(item, index) in projects" :key="'in'+index" class="w150 p-1">
        <h6 class="text-center bg-light p-1 rounded-lg m-0">{{item.title}}</h6>
        <ListTasks :tasks="tasks" :idprojects="item.id" />
      </div>
    </div>
  </div>
</template>

<script>
import ListTasks from '@/components/projects/ListTasks'

export default {
  components: {
    ListTasks
  },
  props: {},
  computed: {
    projects() {
      return this.$store.getters.projects
    },
    tasks() {
      return this.$store.getters.tasks
    },
    displayProjects() {
      return this.projects.filter(proj => proj.childs > 0)
    }
  }
}
</script>

<style scoped>
.ower {
  overflow: auto;
  min-height: 500px;
}

.w150 {
  min-width: 150px;
}
</style>
 