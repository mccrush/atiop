<template>
  <div class="col-2">
    <ListItems
      v-for="direction in directions"
      :key="direction.id"
      :title="direction.title"
      :parentId="direction.id"
      type="project"
    />
  </div>
</template>

<script>
import ListItems from './ListItems.vue'

export default {
  components: {
    ListItems
  },
  computed: {
    directions() {
      return this.$store.getters.direction
    }
  }
}
</script>