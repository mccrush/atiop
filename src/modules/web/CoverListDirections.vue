<template>
  <div class="col-2">
    <FormAddItem type="direction" />

    <ListItems
      v-for="direction in directions"
      :key="direction.id"
      :directionItem="direction"
      :title="direction.title"
      :parentId="direction.id"
      type="project"
    />
  </div>
</template>

<script>
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
    }
  }
}
</script>