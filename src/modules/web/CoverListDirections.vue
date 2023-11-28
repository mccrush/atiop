<template>
  <div>
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