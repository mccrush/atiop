<template>
  <div class="col-2">
    <ListItems title="Просроченые" type="task" listType="lostday" />
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