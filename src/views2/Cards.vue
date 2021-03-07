<template>
  <div class="row d-flex align-content-start bg-light pt-3 ps-2 cards">
    <Item
      v-for="item in tasksFilter"
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
    napravId() {
      return this.$store.getters.napravId
    },
    projectId() {
      return this.$store.getters.projectId
    },
    tasks() {
      return this.$store.getters.tasks2
    },
    tasksFilter() {
      if (this.projectId) {
        return this.tasks.filter(item => item.projectId === this.projectId)
      } else if (this.napravId) {
        return this.tasks.filter(item => item.napravId === this.napravId)
      }
      return this.tasks
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