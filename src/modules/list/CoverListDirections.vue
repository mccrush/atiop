<template>
  <div class="at-height-100 col-3 col-xxl-2 pt-3 pb-4 overflow-y-auto">
    <FormAddItem type="direction" />

    <ListItems
      v-for="direction in directionsSort"
      :key="direction.id"
      :directionItem="direction"
      :title="direction.title"
      :parentId="direction.id"
      type="project"
    />
  </div>
</template>

<script>
import { sortMethod } from './../../helpers/sortMethod'

import FormAddItem from './../../components/forms/FormAddItem.vue'
import ListItems from './ListItems.vue'

export default {
  components: {
    FormAddItem,
    ListItems
  },
  computed: {
    directions() {
      return this.$store.getters.direction
    },
    directionsSort() {
      return sortMethod(this.directions, 'asc', 'position')
    }
  }
}
</script>

<style scoped>
.at-height-100 {
  height: calc(100svh - 70px);
}
</style>