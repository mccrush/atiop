<template>
  <div>
    <ListItems title="Предстоящие" type="task" listType="comingday" />
  </div>
</template>

<script>
import ListItems from './ListItems.vue'

export default {
  components: {
    ListItems
  }
}
</script>