<template>
  <div
    class="row d-flex flex-nowrap align-items-start bg-light pt-3 ps-2 kanban"
  >
    <List
      v-for="list in itemsFilter"
      :key="'list' + list.id"
      :list="list"
      @edit-item="editItem"
    />
  </div>
</template>

<script>
import List from '@/components/item/List'

export default {
  components: {
    List
  },
  computed: {
    viewType() {
      return this.$store.getters.viewType
    },
    napravId() {
      return this.$store.getters.napravId
    },
    projectId() {
      return this.$store.getters.projectId
    },
    lists() {
      return this.$store.getters.lists2
    },
    items() {
      if (this.viewType === 'napravs') {
        return this.$store.getters.napravs2
      }
      return this.$store.getters.projects2
    },
    itemsFilter() {
      if (this.napravId) {
        if (this.projectId) {
          return this.lists.filter(item => item.projectId === this.projectId)
        } else {
          return this.items.filter(item => item.napravId === this.napravId)
        }
      } else {
        return this.items
      }
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
.kanban {
  height: calc(100vh - 60px);
  overflow-x: auto;
}

.my-width-none {
  width: auto !important;
  max-width: none !important;
}
</style>