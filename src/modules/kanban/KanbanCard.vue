<template>
  <button class="btn btn-dark text-muted w-100 mt-2 p-2 pb-1">
    <div class="text-start lh-1">{{ item.title }}</div>
    <div class="info-block d-flex align-items-center justify-content-end">
      <span
        class="badge fw-normal"
        :class="{
          'text-bg-warning': dayDifference(item.dateReminde) < 1,
          'text-bg-dark': dayDifference(item.dateReminde) >= 1
        }"
        v-if="item.dateReminde"
        >{{ getLocaleDateFromDateDigit(item.dateReminde) }}</span
      >

      <span
        v-if="item.price"
        class="badge bg-dark fw-normal text-success ms-1 p-1"
        :class="{ 'text-decoration-line-through': item.status === 'done' }"
        >{{ item.price }}</span
      >
      <span
        v-if="item.minutes"
        class="badge bg-dark fw-normal text-secondary ms-1"
        >{{ item.minutes }}</span
      >
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
    }
  }
}
</script>