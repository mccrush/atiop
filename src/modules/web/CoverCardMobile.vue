<template>
  <div>
    <FormTask v-if="item" :item="item" />
  </div>
</template>

<script>
import FormTask from './../../components/forms/FormTask.vue'
export default {
  components: {
    FormTask
  },
  computed: {
    item() {
      return this.$store.getters.item
    }
  }
}
</script>