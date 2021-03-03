<template>
  <div class="row align-content-start bg-light m-0 pt-3 cards">
    <Item
      v-for="item in items"
      :key="'item' + item.id"
      :item="item"
      @edit-item="editItem"
    />
  </div>
</template>

<script>
import Item from '@/components/item/Item'

export default {
  components: {
    Item,
  },
  computed: {
    viewType() {
      return this.$store.getters.viewType
    },
    items() {
      return this.$store.getters[this.viewType + '2']
    },
  },
  methods: {
    editItem() {},
  },
}
</script>

<style scoped>
.cards {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>