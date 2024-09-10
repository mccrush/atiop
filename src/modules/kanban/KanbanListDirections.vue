<template>
  <div
    class="at-height-100 col-2 col-lg-1 shadow-sm border-end border-dark-subtle"
  >
    <button
      v-for="direction in directions"
      :key="direction.id"
      class="btn btn-sm btn-dark lh-1 p-2 mt-1 w-100"
      :class="{ active: direction.id === directionId }"
      @click="setItemId(direction)"
    >
      {{ direction.title }}
    </button>
    <div class="mt-1">
      <BtnAddLight v-show="!createItem" @click="showAddForm" />
      <FormAddItem
        v-show="createItem"
        type="direction"
        ref="addForm"
        @set-item-id="setItemId"
        @hide-add-form="createItem = false"
      />
    </div>
  </div>
</template>

<script>
import BtnAddLight from './../../components/buttons/BtnAddLight.vue'
import FormAddItem from './../../components/forms/FormAddItem.vue'

export default {
  components: {
    BtnAddLight,
    FormAddItem
  },
  data() {
    return {
      createItem: false
    }
  },
  computed: {
    directions() {
      return this.$store.getters.direction
    },
    directionId() {
      return this.$store.getters.directionId
    }
  },
  methods: {
    setItemId(item) {
      this.$store.commit('setItemId', { type: 'project', id: '' })
      this.$store.commit('setItemId', { type: 'task', id: '' })
      this.$store.commit('setItemId', { type: item.type, id: item.id })
      this.$store.commit('setItem', { type: item.type, item })
    },
    showAddForm() {
      this.createItem = true
      this.$refs.addForm.setFocus()
    }
  }
}
</script>

<style scoped>
.at-height-100 {
  height: calc(100svh - 53px);
}
</style>