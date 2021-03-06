<template>
  <div class="row d-flex align-content-start bg-light pt-3 ps-2 cards">
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
    Item
  },
  computed: {
    viewType() {
      return this.$store.getters.viewType
    },
    items() {
      return this.$store.getters[this.viewType + '2']
    }
  },
  methods: {
    editItem({ id, type }) {
      this.$emit('edit-item', { id, type })
    }
  }
}
</script>

<style scoped>
.cards {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>