<template>
  <div class="col-2">
    <ul v-if="displayProj.length" class="list-group list-group-horizontal mt-2">
      <li
        v-for="item in displayProj"
        :key="item.id"
        class="list-group-item justify-content-between align-items-center border-0 p-0 ml-1 mr-1 cursor-pointer"
      >
        <h6
          class="text-center bg-light rounded p-2 elem"
          :style="{'background': item.color ? item.color+'!important' : '#f8f9fa!important'}"
          @dblclick.prevent="$emit('edit-item', {id: item.id, type: item.type})"
        >{{item.title}}</h6>
        <TaskList :projectId="item.id" />
      </li>
    </ul>
    <!-- <p v-else class="li">
      <small>Список пуст</small>
    </p>-->
  </div>
</template>

<script>
import TaskList from '@/components/general/TaskList'

export default {
  components: {
    TaskList,
  },
  props: ['projects', 'napravId', 'color'],
  computed: {
    displayProj() {
      return this.projects.filter((item) => item.napravId === this.napravId)
    },
  },
}
</script>

<style scoped>
h6 {
  min-width: 170px;
}
</style>