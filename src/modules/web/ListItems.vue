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
        v-for="item in itemsSort"
        :key="item.id"
        class="cursor-default list-group-item lh-1 d-flex justify-content-between align-items-strache ps-2 ps-xxl-3 pe-1 pe-xxl-2"
        :class="{ active: item.id === currentItemId }"
        @click="setItemId(item)"
        @dblclick="editItem(item)"
      >
        <div class="d-flex align-items-center me-auto pe-1">
          <div>{{ item.title }}</div>
        </div>
        <div
          class="info-block d-flex align-items-start justify-content-between"
        >
          <span
            class="badge me-1"
            :class="{
              'text-bg-warning': dayDifference(item.dateReminde) < 1,
              'text-bg-light': dayDifference(item.dateReminde) >= 1
            }"
            v-if="item.dateReminde"
            >{{ getLocaleDateFromDateDigit(item.dateReminde) }}</span
          >
          <span v-if="item.price" class="badge text-bg-success me-1">{{
            item.price
          }}</span>
          <span class="badge text-bg-light">{{
            getChildrenItemsLength(item.id)
          }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { sortMethod } from './../../helpers/sortMethod'
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
    type: String,
    listType: String
  },
  computed: {
    directionId() {
      return this.$store.getters.directionId
    },
    items() {
      if (this.listType === 'lostday') {
        return this.$store.getters.task.filter(
          item => item.dateReminde && this.dayDifference(item.dateReminde) < 1
        )
      } else if (this.listType === 'today') {
        return this.$store.getters.task.filter(
          item => item.dateReminde && this.dayDifference(item.dateReminde) == 1
        )
      } else if (this.listType === 'comingday') {
        return this.$store.getters.task.filter(
          item => item.dateReminde && this.dayDifference(item.dateReminde) > 1
        )
      } else {
        if (this.type === 'project' || this.type === 'task') {
          return this.$store.getters[this.type].filter(
            item => item.parentId === this.parentId
          )
        } else {
          return this.$store.getters[this.type]
        }
      }
    },
    itemsSort() {
      return sortMethod(this.items, 'asc', 'position')
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
      if (item.type === 'task') {
        this.$store.commit('setItemId', { type: 'project', id: item.parentId })
      }
      this.$store.commit('setItemId', { type: item.type, id: item.id })
      this.$store.commit('setItem', { type: item.type, item })
    },
    getChildrenItemsLength(parentId) {
      if (this.type === 'project') {
        return this.$store.getters.childrenItemsLength('task', parentId)
      }
    },
    dayDifference(dateReminde) {
      if (dateReminde) {
        const difference =
          Math.ceil(new Date(dateReminde).getTime() / (1000 * 3600 * 24)) -
          Math.ceil(new Date().getTime() / (1000 * 3600 * 24)) +
          1
        return difference
      } else {
        return 1
      }
    }
  }
}
</script>