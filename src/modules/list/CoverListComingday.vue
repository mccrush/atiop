<template>
  <div class="col-3 col-xxl-2">
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