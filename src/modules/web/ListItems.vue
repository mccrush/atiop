<template>
  <div class="mt-3">
    <div
      v-if="directionItem"
      class="fw-bold cursor-default"
      @click="setItemId(directionItem)"
    >
      {{ title }}
    </div>
    <div v-else class="fw-bold">{{ title }}</div>
    <FormAddItem
      v-if="type === 'project' && parentId === directionId"
      type="project"
      :parentId="directionId"
    />
    <ul class="list-group mt-1 mb-3">
      <li
        v-for="item in items"
        :key="item.id"
        class="cursor-default list-group-item lh-1 d-flex justify-content-between align-items-center pe-2"
        :class="{ active: item.id === currentItemId }"
        @click="setItemId(item)"
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

import FormAddItem from './../../components/forms/FormAddItem.vue'

export default {
  components: {
    FormAddItem
  },
  props: {
    directionItem: Object,
    title: String,
    parentId: String,
    type: String
  },
  computed: {
    directionId() {
      return this.$store.getters.directionId
    },
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
        case 'project':
          return this.$store.getters.projectId
        case 'task':
          return this.$store.getters.taskId
      }
    }
  },
  methods: {
    getLocaleDateFromDateDigit,
    setItemId(item) {
      if (item.type === 'direction') {
        this.$store.commit('setItemId', { type: 'project', id: '' })
        this.$store.commit('setItemId', { type: 'task', id: '' })
      }
      if (item.type === 'project') {
        this.$store.commit('setItemId', { type: 'task', id: '' })
      }
      this.$store.commit('setItemId', { type: item.type, id: item.id })
      this.$store.commit('setItem', { type: item.type, item })
    }
  }
}
</script>