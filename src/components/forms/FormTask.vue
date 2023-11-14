<template>
  <div class="col-4 border rounded bg-white p-3">
    <div class="mb-3">
      <input
        type="text"
        class="form-control"
        id="title"
        placeholder="Title"
        v-model="title"
        @keyup.enter="createItem"
      />
    </div>
    <button class="btn btn-primary" @click="createItem">Create Task</button>
  </div>
</template>

<script>
import { taskFabrica } from './../../helpers/fabrics/taskFabrica'

export default {
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
        let item = taskFabrica()
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
