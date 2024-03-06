<template>
  <div>
    <FormTask :item="item" />
  </div>
</template>

<script>
import FormTask from './../../components/forms/FormTask.vue'

export default {
  components: {
    FormTask
  },
  props: {
    item: Object
  }
}
</script>