<template>
  <select
    class="form-select form-select-sm"
    :disabled="disabl"
    v-model="filter"
    @change="$emit('save-filter', { type, filter })"
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
    oldfilter: String,
    items: Array,
    type: String,
    disabl: Boolean,
  },
  data() {
    return {
      filter: this.oldfilter || '',
    }
  },
}
</script>