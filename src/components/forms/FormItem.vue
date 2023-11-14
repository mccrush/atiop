<template>
  <div class="border rounded bg-white p-3">
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        id="title"
        aria-describedby="addButton"
        placeholder="Title"
        v-model="title"
        @keyup.enter="createItem"
      />
      <button class="btn btn-primary" id="addButton" @click="createItem">
        Add
      </button>
    </div>
  </div>
</template>

<script>
import { mainFabrica } from './../../helpers/fabrics/mainFabrica'

export default {
  props: {
    type: String
  },
  data() {
    return {
      title: ''
    }
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    }
  },
  methods: {
    createItem() {
      if (this.title) {
        let item = mainFabrica({ type: this.type })
        item.title = this.title
        this.$store.dispatch('addItemRT', {
          item,
          currentUserId: this.currentUserId
        })
        this.title = ''
      }
    }
  }
}
</script>
