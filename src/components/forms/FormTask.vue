<template>
  <div>
    <input
      type="text"
      class="form-control bg-white"
      v-model="item.title"
      @blur="saveItem"
    />
    <textarea
      class="form-control bg-white mt-3"
      rows="3"
      v-model="item.description"
      @blur="saveItem"
    ></textarea>
    <input
      type="number"
      class="form-control bg-white mt-3"
      v-model="item.position"
      @blur="saveItem"
    />
  </div>
</template>

<script>
export default {
  props: {
    item: Object,
    currentUserId: String
  },
  methods: {
    saveItem() {
      this.$store.dispatch('updateItemRT', {
        item: this.item,
        currentUserId: this.currentUserId
      })
    }
  }
}
</script>