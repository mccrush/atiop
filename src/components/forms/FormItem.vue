<template>
  <div>
    <div class="input-group">
      <input
        type="text"
        class="form-control bg-white"
        :id="'title' + type"
        aria-describedby="addButton"
        v-model="title"
        @keyup.enter="createItem"
      />
      <BtnAdd @click="createItem" />
    </div>
  </div>
</template>

<script>
import { mainFabrica } from './../../helpers/fabrics/mainFabrica'

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
