<template>
  <div class="row bg-success p-3 kanban">
    <div class="my-width-none p-0">
      <List
        v-for="list in items"
        :key="'list' + list.id"
        :list="list"
        @edit-item="editItem"
      />
    </div>
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
    items() {
      if (this.viewType === 'tasks') {
        return this.$store.getters['projects2']
      }
      return this.$store.getters[this.viewType + '2']
    },
  },
  methods: {
    editItem() {},
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