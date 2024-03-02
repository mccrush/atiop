<template>
  <div class="input-group input-group-sm">
    <input
      type="text"
      class="form-control"
      aria-describedby="addButton"
      :name="'id' + type"
      :placeholder="getPlaceholder"
      :disabled="
        ((type == 'task' || type == 'project') && !parentId) ||
        (type == 'task' && searchFilter.length)
      "
      v-model="title"
      @keyup.enter="createItem"
    />
    <BtnAdd @click="createItem" />
  </div>
</template>

<script>
import { modelsFactory } from './../../helpers/modelsFactory'
import { dataModels } from './../../data/dataModels'

import BtnAdd from './../buttons/BtnAdd.vue'

export default {
  components: {
    BtnAdd
  },
  props: {
    type: String,
    parentId: String,
    searchFilter: String
  },
  emits: ['set-item-id'],
  data() {
    return {
      title: ''
    }
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    },
    getPlaceholder() {
      return dataModels.find(item => item.type === this.type).title
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

        this.$emit('set-item-id', item)
      }
    }
  }
}
</script>
