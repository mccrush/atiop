<template>
  <div class="row d-flex align-items-start bg-light pt-3 ps-2 kanban">
    <List
      v-for="list in items"
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
    List,
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
    items() {
      if (this.napravId) {
        if (this.projectId) {
          return this.$store.getters.lists2.filter(
            (item) => item.projectId === this.projectId
          )
        } else {
          return this.$store.getters.projects2.filter(
            (item) => item.napravId === this.napravId
          )
        }
      } else {
        return this.$store.getters.napravs2
      }
    },
  },
  methods: {
    editItem({ id, type }) {
      this.$emit('edit-item', { id, type })
    },
  },
}
</script>

<style scoped>
.kanban {
  height: calc(100vh - 60px);
  overflow-y: auto;
}

.my-width-none {
  width: auto !important;
  max-width: none !important;
}
</style>