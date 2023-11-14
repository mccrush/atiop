<template>
  <div>
    <div class="row">
      <MainItemsList type="direction" class="" />
      <MainItemsList
        v-if="directionId"
        :parentId="directionId"
        type="project"
        class="ps-0"
      />
      <MainItemsList
        v-if="projectId"
        :parentId="projectId"
        type="task"
        class="ps-0"
      />
    </div>
  </div>
</template>

<script>
import MainItemsList from './../modules/main/MainItemsList.vue'

export default {
  components: {
    MainItemsList
  },
  computed: {
    directionId() {
      return this.$store.getters.directionId
    },
    projectId() {
      return this.$store.getters.projectId
    }
  }
}
</script>