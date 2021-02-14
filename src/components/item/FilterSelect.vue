<template>
  <select
    class="form-select form-select-sm"
    :disabled="
      (!$route.query.nap && (type === 'proj' || type === 'list')) ||
      (!$route.query.proj && type === 'list') ||
      (type === 'proj' && !items.length) ||
      (type === 'list' && !items.length)
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
          ? this.$store.getters.nap || ''
          : this.$store.getters.proj || '',
    }
  },
  computed: {
    nap() {
      return this.$store.getters.nap
    },
    proj() {
      return this.$store.getters.proj
    },
  },
  watch: {
    nap(oldVal, newVal) {
      if (this.type === 'nap') {
        this.filter = newVal
      } else {
        this.filter = ''
      }
    },
    proj(oldVal, newVal) {
      this.filter = newVal
    },
  },
  methods: {
    saveFilter() {
      //console.log('type =', this.type, ' filter = ', this.filter)
      if (this.type === 'nap') {
        if (this.filter) {
          this.$router.push({ query: { nap: this.filter } })
        } else {
          this.$router.push({ query: '' })
        }
        this.$store.commit('setNap', this.filter)
      } else {
        this.$router.push({
          query: { nap: this.$route.query.nap, proj: this.filter },
        })
        this.$store.commit('setProj', this.filter)
      }
    },
  },
}
</script>