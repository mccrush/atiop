<template>
  <div>
    <CardItem v-if="item" :item="item" />
  </div>
</template>

<script>
import CardItem from './CardItem.vue'

export default {
  components: {
    CardItem
  },
  computed: {
    item() {
      return this.$store.getters.item
    }
  }
}
</script>