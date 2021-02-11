<template>
  <div class="col-3 col-xl-2 border">
    <h3>{{ list.title }}</h3>

    <AddItem v-if="list.type === 'lists'" :type="'tasks'" />
  </div>
</template>

<script>
import AddItem from '@/components/item/AddItem'

export default {
  components: {
    AddItem,
  },
  props: ['list'],
  // computed: {
  //   projectId() {
  //     if (this.list.type === 'projects') {
  //       return this.list.id
  //     }
  //   },
  // },
}
</script>

<style scoped>
</style>