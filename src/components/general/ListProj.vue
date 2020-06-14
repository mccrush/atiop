<template>
  <div class="col-2">
    <ul v-if="displayProj.length" class="list-group list-group-horizontal mt-3">
      <li
        v-for="(item, index) in displayProj"
        :key="'in'+index"
        class="list-group-item p-0 pl-1 pr-1 justify-content-between align-items-center cursor-pointer"
      >
        <small>{{item.title}}</small>
      </li>
    </ul>
    <p v-else class="li">
      <small>Список пуст</small>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    projects: {
      type: Array
    },
    idnapravs: {
      type: String
    }
  },
  computed: {
    displayProj() {
      return this.projects.filter(item => item.idnapravs === this.idnapravs)
    }
  }
}
</script>

<style scoped>
li,
p.li {
  min-width: 120px;
}
</style>