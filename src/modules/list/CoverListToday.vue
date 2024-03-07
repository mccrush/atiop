<template>
  <div class="col-3 col-xxl-2">
    <ListItems title="На сегодня" type="task" listType="today" />
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