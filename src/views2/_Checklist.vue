<template>
  <div class="row bg-light pt-3 ps-3 pe-3 checklist">
    <ul class="list-group p-0">
      <li v-for="i in items" :key="i + 'kk'" class="list-group-item">
        <input
          class="form-check-input me-2"
          type="checkbox"
          value=""
          aria-label="..."
        />
        {{ i.title }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    viewType() {
      return this.$store.getters.viewType
    },
    items() {
      return this.$store.getters[this.viewType + '2']
    },
  },
  methods: {
    editItem({ id, type }) {
      this.$emit('edit-item', { id, type })
    },
  },
}
</script>

<style scoped>
.checklist {
  height: calc(100vh - 60px);
  overflow-y: auto;
}
</style>