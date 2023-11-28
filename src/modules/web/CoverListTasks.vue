<template>
  <div>
    <FormAddItem type="task" :parentId="projectId" />
    <ListItems title="Задачи" :parentId="projectId" type="task" />
  </div>
</template>

<script>
import FormAddItem from './../../components/forms/FormAddItem.vue'
import ListItems from './ListItems.vue'

export default {
  components: {
    FormAddItem,
    ListItems
  },
  computed: {
    projectId() {
      return this.$store.getters.projectId
    }
  }
}
</script>