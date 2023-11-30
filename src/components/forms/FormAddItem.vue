<template>
  <div class="input-group input-group-sm">
    <input
      type="text"
      class="form-control"
      aria-describedby="addButton"
      :name="'id' + type"
      :placeholder="type"
      :disabled="(type == 'task' || type == 'project') && !parentId"
      v-model="title"
      @keyup.enter="createItem"
    />
    <BtnAdd @click="createItem" />
  </div>
</template>

<script>
import { modelsFactory } from './../../helpers/modelsFactory'

import BtnAdd from './../buttons/BtnAdd.vue'

export default {
  components: {
    BtnAdd
  },
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
        console.log('type = ', this.type)
        //return false
        let item = modelsFactory({ type: this.type, parentId: this.parentId })
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
