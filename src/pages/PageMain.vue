<template>
  <div>
    <div class="row">
      <MainItemsList type="direction" class="pe-0" />
      <MainItemsList
        v-if="directionId"
        :parentId="directionId"
        type="project"
        class="pe-0"
      />
      <MainItemsList v-if="projectId" :parentId="projectId" type="task" />
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