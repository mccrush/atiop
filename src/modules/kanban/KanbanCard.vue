<template>
  <button
    class="btn btn-light w-100 mt-2 p-2"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasForm"
    aria-controls="offcanvasForm"
    @click="setItemId(item)"
  >
    <div class="text-start lh-1">{{ item.title }}</div>
    <div class="info-block d-flex align-items-center justify-content-end">
      <span
        class="badge"
        :class="{
          'text-bg-warning': dayDifference(item.dateReminde) < 1,
          'text-bg-light': dayDifference(item.dateReminde) >= 1
        }"
        v-if="item.dateReminde"
        >{{ getLocaleDateFromDateDigit(item.dateReminde) }}</span
      >

      <span v-if="item.price" class="badge bg-light text-success ms-1 p-1">{{
        item.price
      }}</span>
      <span v-if="item.minutes" class="badge bg-light text-secondary ms-1">{{
        item.minutes
      }}</span>
    </div>
  </button>
</template>

<script>
import { getLocaleDateFromDateDigit } from './../../helpers/getDateFormat'

export default {
  props: {
    item: Object
  },
  methods: {
    getLocaleDateFromDateDigit,
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
    },
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
    }
  }
}
</script>