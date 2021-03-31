<template>
  <div
    class="row d-flex flex-nowrap align-items-start bg-light pt-3 ps-2 kanban"
  >
    <List
      v-for="list in lists"
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
    lists() {
      return [
        { id: '01', title: 'Задачи на день', type: 'person', mode: 'today' },
        {
          id: '02',
          title: 'Просроченные задачи',
          type: 'person',
          mode: 'lastday'
        },
        {
          id: '03',
          title: 'Следующие задачи',
          type: 'person',
          mode: 'nexttask'
        }
      ]
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