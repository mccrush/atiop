<template>
  <div
    class="row row-cols-1 row-cols-sm-2 row-cols-md-4 row-cols-xl-6 row-cols-xxl-8 align-content-start bg-warning p-3 cards"
  >
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