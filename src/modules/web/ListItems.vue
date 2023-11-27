<template>
  <div>
    <div class="fw-bold">{{ title }}</div>

    <ul class="list-group mt-1 mb-3">
      <li
        v-for="item in items"
        :key="item.id"
        class="cursor-default list-group-item lh-1 d-flex justify-content-between align-items-center pe-2"
        :class="{ active: item.id === currentItemId }"
        @click="setItemId(item.id, item)"
        @dblclick="editItem(item)"
      >
        <div class="me-auto">
          <div class="">{{ item.title }}</div>
        </div>
        <div
          class="info-block d-flex justify-content-between align-items-center"
        >
          <span class="badge text-bg-light me-1" v-if="item.dateReminde">{{
            getLocaleDateFromDateDigit(item.dateReminde)
          }}</span>
          <span v-if="item.price" class="badge text-bg-success me-1">{{
            item.price
          }}</span>
          <!-- <span class="badge text-bg-light">{{
            getChildrenItemsLength(item.id)
          }}</span> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { getLocaleDateFromDateDigit } from './../../helpers/getDateFormat'

export default {
  props: {
    title: String,
    parentId: String,
    type: String
  },
  computed: {
    items() {
      if (this.type === 'project' || this.type === 'task') {
        return this.$store.getters[this.type].filter(
          item => item.parentId === this.parentId
        )
      } else {
        return this.$store.getters[this.type]
      }
    },
    currentItemId() {
      switch (this.type) {
        case 'direction':
          return this.$store.getters.directionId
        case 'project':
          return this.$store.getters.projectId
        case 'task':
          return this.$store.getters.taskId
      }
    }
  },
  methods: {
    getLocaleDateFromDateDigit,
    setItemId(id, item) {
      if (this.type === 'project') {
        this.$store.commit('setItemId', { type: 'task', id: '' })
      }
      this.$store.commit('setItemId', { type: this.type, id })
      this.$store.commit('setItem', { type: this.type, item })
    }
  }
}
</script>