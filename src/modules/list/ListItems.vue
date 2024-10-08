<template>
  <div class="mt-3">
    <div
      v-if="directionItem"
      class="cursor-default"
      @click="setItemId(directionItem)"
    >
      {{ title }}
    </div>
    <div v-else class="">{{ title }}</div>
    <FormAddItem
      v-if="type === 'project' && parentId === directionId"
      type="project"
      :parentId="directionId"
      @set-item-id="setItemId"
    />
    <ul class="list-group rounded-1 mt-1 mb-3">
      <li
        v-for="item in itemsSort"
        :key="item.id"
        class="cursor-pointer list-group-item lh-1 d-flex justify-content-between align-items-strache ps-2 ps-xxl-3 pe-1 pe-xxl-2"
        :class="{ active: item.id === currentItemId }"
        @click="setItemId(item)"
      >
        <!-- <input
          v-if="type === 'task'"
          type="checkbox"
          class="border form-check-input m-0 me-2"
        /> -->

        <div class="d-flex align-items-center me-auto pe-1">
          <div class="text-start d-flex justify-content-start">
            <IconCardText
              v-if="item.description"
              class="d-block text-body-tertiary me-2"
            />
            <div>{{ item.title }}</div>
          </div>
        </div>
        <div
          class="info-block d-flex align-items-start justify-content-between"
        >
          <span
            class="badge fw-normal me-1"
            :class="{
              'text-warning': dayDifference(item.dateReminde) < 1,
              'text-body-secondary': dayDifference(item.dateReminde) >= 1
            }"
            v-if="item.dateReminde"
            >{{ getLocaleDateFromDateDigit(item.dateReminde) }}</span
          >
          <span
            v-if="item.type === 'task' && item.price"
            class="badge bg-dark fw-normal text-success me-1"
            >{{ item.price }}</span
          >
          <span
            v-if="item.type === 'task' && item.minutes"
            class="badge bg-dark fw-normal text-body-secondary me-1"
            >{{ item.minutes }}</span
          >
          <!-- Для проектов выводить суммы денег и времени -->
          <!-- В Канбан это будет выводиться в заголовке столбца -->
          <span class="badge fw-normal text-bg-dark">{{
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

import IconCardText from './../../components/icons/IconCardText.vue'
import FormAddItem from './../../components/forms/FormAddItem.vue'

export default {
  components: {
    IconCardText,
    FormAddItem
  },
  props: {
    directionItem: Object,
    title: String,
    parentId: String,
    type: String,
    listType: String,
    searchFilter: String
  },
  computed: {
    directionId() {
      return this.$store.getters.directionId
    },
    tag() {
      return this.$store.getters.tag
    },
    tasks() {
      return this.$store.getters.task
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
    itemsFilter() {
      if (this.type === 'task') {
        if (this.tag) {
          // let arr = []
          // this.tasks.forEach(task => {
          //   if (task.tags && task.tags.length) {
          //     task.tags.forEach(el => {
          //       if (el.id === this.tag.id) {
          //         arr.push(task)
          //       }
          //     })
          //   }
          // })
          // return arr

          return this.tasks.filter(
            task =>
              task.tags &&
              task.tags.length &&
              task.tags.some(e => e.id === this.tag.id)
          )
        } else if (this.searchFilter) {
          return this.tasks.filter(item =>
            item.title.toUpperCase().includes(this.searchFilter.toUpperCase())
          )
        } else {
          return this.items
        }
      } else {
        return this.items
      }
    },
    itemsSort() {
      if (
        this.listType === 'lostday' ||
        this.listType === 'today' ||
        this.listType === 'comingday'
      ) {
        return sortMethod(this.itemsFilter, 'asc', 'dateReminde')
      }
      return sortMethod(this.itemsFilter, 'asc', 'position')
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