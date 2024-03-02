<template>
  <div>
    <FormSearchItem @update-search="updateSearch" />
    <FormAddItem
      type="task"
      :parentId="projectId"
      :searchFilter="searchFilter"
      @set-item-id="setItemId"
    />
    <ListItems
      ref="listItems"
      :title="appMode === 'tasks' ? 'Задачи' : 'Заметки'"
      :parentId="projectId"
      :searchFilter="searchFilter"
      type="task"
    />
  </div>
</template>

<script>
import FormSearchItem from './../../components/forms/FormSearchItem.vue'
import FormAddItem from './../../components/forms/FormAddItem.vue'
import ListItems from './ListItems.vue'

export default {
  components: {
    FormSearchItem,
    FormAddItem,
    ListItems
  },
  data() {
    return {
      searchFilter: ''
    }
  },
  computed: {
    projectId() {
      return this.$store.getters.projectId
    },
    appMode() {
      return this.$store.getters.appMode
    }
  },
  methods: {
    updateSearch(newVal) {
      this.searchFilter = newVal
    },
    setItemId(item) {
      this.$refs.listItems.setItemId(item)
    }
  }
}
</script>