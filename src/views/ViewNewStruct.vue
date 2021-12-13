<template>
  <div
    class="row d-flex flex-nowrap align-items-start bg-light pt-3 ps-2 kanban"
    id="rowScroll"
  >
    <CycleView :array="napravs" type="napravs" id="" parentId="" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      types: ['napravs', 'projects', 'lists', 'tasks'],
      napravs: JSON.parse(localStorage.getItem('napravs')) || [],
      projects: JSON.parse(localStorage.getItem('projects')) || [],
      lists: JSON.parse(localStorage.getItem('lists')) || [],
      tasks: JSON.parse(localStorage.getItem('tasks')) || []
    }
  },
  methods: {
    getChildArray(type, parentId) {
      if (parentId) {
        return this[type].filter(item => item.parentId === parentId)
      } else {
        return this[type]
      }
    }
  }
}
</script>

<style scoped>
.kanban {
  height: calc(100vh - 56px);
  overflow-x: auto;
}

.my-width-none {
  width: auto !important;
  max-width: none !important;
}

.active {
  cursor: grabbing;
}
</style>