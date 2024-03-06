<template>
  <div class="col-2 col-lg-1">
    <button
      v-for="direction in directions"
      :key="direction.id"
      class="btn btn-light btn-sm lh-1 mt-2 w-100"
      @click="setItemId(direction)"
    >
      {{ direction.title }}
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    directions() {
      return this.$store.getters.direction
    }
  },
  methods: {
    setItemId(item) {
      this.$store.commit('setItemId', { type: 'project', id: '' })
      this.$store.commit('setItemId', { type: 'task', id: '' })
      this.$store.commit('setItemId', { type: item.type, id: item.id })
      this.$store.commit('setItem', { type: item.type, item })
    }
  }
}
</script>