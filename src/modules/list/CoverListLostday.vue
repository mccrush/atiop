<template>
  <div>
    <ListItems title="Просроченные" type="task" listType="lostday" />
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