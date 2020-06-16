<template>
  <div class="h120">
    <ul class="list-group list-group-flush">
      <li
        v-for="(proj, index) in displayProjects"
        :key="'pj'+index"
        class="list-group-item border rounded p-0 pl-2 mt-1"
      >
        <small>{{proj.title}}</small>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['monthNumber'],
  computed: {
    projects() {
      return this.$store.getters.projects
    },
    displayProjects() {
      return this.projects.filter(
        item => new Date(item.date).getMonth() + 1 === +this.monthNumber
      )
    }
  }
}
</script>

<style scoped>
.h120 {
  height: 120px;
  overflow-y: auto;
}
</style>