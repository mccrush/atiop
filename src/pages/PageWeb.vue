<template>
  <component :is="component" />
</template>

<script>
import ListMain from './../modules/list/ListMain.vue'
import KanbanMain from './../modules/kanban/KanbanMain.vue'

export default {
  components: {
    ListMain,
    KanbanMain
  },
  computed: {
    mainView() {
      return this.$store.getters.mainView
    },
    component() {
      if (this.mainView === 'list') {
        return 'ListMain'
      } else if (this.mainView === 'kanban') {
        return 'KanbanMain'
      }
    }
  }
}
</script>