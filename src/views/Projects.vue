<template>
  <div class="row">
    <div v-for="(item, index) in projects" :key="'in'+index" class="col-2 p-1">
      <h5 class="text-center bg-light p-1 rounded-lg m-0">{{item.title}}</h5>
      <ListTasks :tasks="tasks" :idprojects="item.id" />
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
    }
  }
}
</script>

<style scoped>
li {
  min-width: 120px;
}
</style>
 