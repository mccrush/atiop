<template>
  <div>
    <input
      type="text"
      class="form-control bg-white"
      v-model.trim="item.title"
      @blur="saveItem"
    />
    <textarea
      class="form-control bg-white mt-3"
      rows="3"
      v-model="item.description"
      @blur="saveItem"
    ></textarea>
    <div class="row">
      <div class="col-4">
        <input
          type="number"
          class="col-4 form-control bg-white mt-3"
          v-model.number="item.position"
          @blur="saveItem"
        />
      </div>
      <div class="col-4">
        <input
          type="number"
          class="col-4 form-control bg-white mt-3"
          min="0"
          step="10"
          v-model.number="item.price"
          @blur="saveItem"
        />
      </div>
      <div class="col-4"></div>
    </div>
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