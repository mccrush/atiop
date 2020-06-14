<template>
  <div class="p-0">
    <ul v-if="displayTasks.length" class="list-group mt-1">
      <li
        v-for="(item, index) in displayTasks"
        :key="'in'+index"
        class="list-group-item justify-content-between align-items-center cursor-pointer p-2 pl-3"
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
    tasks: {
      type: Array
    },
    idprojects: {
      type: String
    }
  },
  computed: {
    displayTasks() {
      return this.tasks.filter(item => item.idprojects === this.idprojects)
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