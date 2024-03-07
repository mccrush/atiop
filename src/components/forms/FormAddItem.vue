<template>
  <div class="input-group input-group-sm">
    <input
      type="text"
      ref="inputForm"
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
      @blur="hideAddForm"
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
    type: { type: String, default: 'direction' },
    parentId: String,
    searchFilter: { type: String, default: '' }
  },
  emits: ['set-item-id', 'hide-add-form'],
  data() {
    return {
      title: ''
    }
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    },
    appMode() {
      return this.$store.getters.appMode
    },
    getPlaceholder() {
      return dataModels.find(
        item => item.appMode === this.appMode && item.type === this.type
      ).title
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
          currentUserId: this.currentUserId,
          appMode: this.appMode
        })
        this.title = ''

        this.$emit('set-item-id', item)
      }
    },
    hideAddForm() {
      if (!this.title) {
        this.$emit('hide-add-form')
      }
    },
    setFocus() {
      this.$nextTick(() => {
        const inputForm = this.$refs.inputForm
        inputForm.focus()
      })
    }
  }
}
</script>
