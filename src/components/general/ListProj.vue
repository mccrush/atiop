<template>
  <div class="col-2">
    <ul v-if="projects.length" class="list-group list-group-horizontal mt-3">
      <li
        v-for="(item, index) in displayProj"
        :key="'in'+index"
        class="list-group-item p-2 pl-3 justify-content-between align-items-center cursor-pointer"
      >
        <span>{{item.title}}</span>
      </li>
    </ul>
    <p v-else>Значений нет</p>
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
      return this.projects.filter(item => (item.idnapravs = this.idnapravs))
    }
  }
}
</script>