<template>
  <div
    v-if="!viewView || viewView === 'cards'"
    class="row d-flex align-content-start bg-light pt-3 ps-2 cards"
  >
    <Item
      v-for="item in sortTasks"
      :key="'item' + item.id"
      :item="item"
      @edit-item="editItem"
    />
  </div>
  <div v-else class="row bg-light pt-3 ps-3 pe-3 checklist">
    <ul class="list-group p-0">
      <li v-for="i in sortTasks" :key="i + 'kk'" class="list-group-item">
        <input
          class="form-check-input me-2"
          type="checkbox"
          value=""
          aria-label="..."
        />
        {{ i.title }}
      </li>
    </ul>
  </div>
</template>

<script>
import Item from '@/components/item/Item'
import sortMethod from '@/scripts/sortMethod'

export default {
  components: {
    Item
  },
  computed: {
    settings() {
      return this.$store.getters.settings
    },
    viewView() {
      return this.$store.getters.viewView
    },
    napravId() {
      return this.$store.getters.napravId
    },
    projectId() {
      return this.$store.getters.projectId
    },
    tasks() {
      return this.$store.getters.tasks
    },
    tasksFilterType() {
      if (this.projectId) {
        return this.tasks.filter(item => item.projectId === this.projectId)
      } else if (this.napravId) {
        return this.tasks.filter(item => item.napravId === this.napravId)
      } else {
        return this.tasks
      }
    },
    itemsFilterArchive() {
      if (!this.settings.showArhived) {
        return this.tasksFilterType.filter(item => item.status !== 'done')
      } else {
        return this.tasksFilterType
      }
    },
    sortTasks() {
      return sortMethod(this.itemsFilterArchive, true, 'position')
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
.cards,
.checklist {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>