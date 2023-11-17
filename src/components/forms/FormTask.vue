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
      <div class="col-3">
        <input
          type="number"
          class="form-control bg-white mt-3"
          v-model.number="item.position"
          @blur="saveItem"
        />
      </div>
      <div class="col-3">
        <input
          type="number"
          class="form-control bg-white mt-3"
          min="0"
          step="10"
          v-model.number="item.price"
          @blur="saveItem"
        />
      </div>
      <div class="col-6">
        <input
          @blur="saveItem"
          type="datetime-local"
          class="form-control mt-3"
          v-model="item.dateReminde"
        />
      </div>
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