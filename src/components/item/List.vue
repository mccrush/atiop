<template>
  <div class="col-3 col-xl-2 border">
    <h3>{{ list.title }}</h3>
    <AddItem :type="'tasks'" />
  </div>
</template>

<script>
import AddItem from '@/components/item/AddItem'

export default {
  components: {
    AddItem,
  },
  props: ['list'],
}
</script>

<style scoped>
</style>