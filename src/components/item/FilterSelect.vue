<template>
  <select
    class="form-select form-select-sm"
    :disabled="
      (!$route.query.nap && type === 'proj') ||
      (type === 'proj' && !items.length)
    "
    v-model="filter"
    @change="saveFilter"
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
  },
  data() {
    return {
      filter:
        this.type === 'nap'
          ? this.$route.query.nap || ''
          : this.$route.query.proj || '',
    }
  },
  methods: {
    saveFilter() {
      //console.log('type =', this.type, ' filter = ', this.filter)
      if (this.type === 'nap') {
        this.$router.push({ query: { nap: this.filter } })
        localStorage.setItem('at-filterNaprav', this.filter)
        localStorage.setItem('at-filterProject', '')
      } else {
        this.$router.push({
          query: { nap: this.$route.query.nap, proj: this.filter },
        })
        localStorage.setItem('at-filterProject', this.filter)
      }
    },
  },
}
</script>