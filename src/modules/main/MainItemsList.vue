<template>
  <div class="col-4">
    <FormItem :type="type" />

    <ul class="list-group mt-2">
      <li
        v-for="item in items"
        :key="item.id"
        class="list-group-item bg-white d-flex justify-content-between align-items-center"
      >
        <div class="me-auto">
          <div class="fw-bold">{{ item.title }}</div>
        </div>
        <button class="btn btn-sm btn-light">D</button>
      </li>
    </ul>
  </div>
</template>

<script>
import FormItem from './../../components/forms/FormItem.vue'

export default {
  components: {
    FormItem
  },
  props: {
    type: String
  },
  computed: {
    items() {
      return this.$store.getters[this.type]
    }
  }
}
</script>