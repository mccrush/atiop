<template>
  <div class="col-2">
    <ListItems v-for="i in 3" :key="i" :title="i" />
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