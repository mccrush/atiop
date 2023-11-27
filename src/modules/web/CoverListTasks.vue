<template>
  <div class="col-2">
    <ListItems title="Tasks" :parentId="projectId" type="task" />
  </div>
</template>

<script>
import ListItems from './ListItems.vue'

export default {
  components: {
    ListItems
  },
  computed: {
    projectId() {
      return this.$store.getters.projectId
    }
  }
}
</script>