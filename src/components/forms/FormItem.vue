<template>
  <div class="border rounded bg-white p-3">
    <div class="input-group">
      <input
        type="text"
        class="form-control"
        :id="'title' + type"
        aria-describedby="addButton"
        placeholder="Title"
        v-model="title"
        @keyup.enter="createItem"
      />
      <button
        class="btn btn-primary"
        :id="'addButton' + type"
        @click="createItem"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
import { mainFabrica } from './../../helpers/fabrics/mainFabrica'

export default {
  props: {
    type: String,
    parentId: String
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
        let item = mainFabrica({ type: this.type, parentId: this.parentId })
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
