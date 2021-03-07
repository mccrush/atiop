<template>
  <select
    class="form-select form-select-sm"
    :disabled="
      (!$route.query.nap && type === 'proj') ||
      (type === 'proj' && !items.length)
    "
    v-model="filter"
    @change="$emit('new-filter', filter)"
  >
    <option value selected>Все</option>
    <option v-for="item in items" :key="item.type + item.id" :value="item.id">
      {{ item.title }}
    </option>
  </select>
</template>

<script>
export default {
  props: {
    items: Array,
    type: String,
    filterIn: String,
  },
  data() {
    return {
      filter: this.filterIn,
    }
  },
  watch: {
    filterIn() {
      if (this.type === 'nap') {
        this.filter = this.$store.getters.nap
      } else {
        this.filter = this.$store.getters.proj
      }
    },
  },
}
</script>