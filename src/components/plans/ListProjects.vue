<template>
  <div class="h150 p-1">
    <ul class="list-group list-group-flush">
      <li
        v-for="(item, index) in displayProjects"
        :key="'pj'+index"
        class="list-group-item rounded-sm border-bottom-0 p-0 pl-2 mt-1"
        :style="{'background': item.color ? item.color+'!important' : '#f8f9fa!important'}"
        @dblclick.prevent="$emit('edit-item', {id: item.id, type: item.type})"
      >
        <small class="elem">{{item.title}}</small>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['projects', 'monthNumber'],
  computed: {
    displayProjects() {
      return this.projects.filter(
        item => new Date(item.date).getMonth() + 1 === +this.monthNumber
      )
    }
  }
}
</script>

<style scoped>
.h150 {
  height: 150px;
  overflow-y: auto;
}
</style>