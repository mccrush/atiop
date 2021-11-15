<template>
  <div class="input-group w-25">
    <button
      class="btn btn-outline-secondary"
      type="button"
      @click="selectMonth--"
      :disabled="selectMonth <= tecMonth"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-left-short"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z"
        />
      </svg>
    </button>
    <select
      class="form-select text-center"
      aria-label="Select month"
      v-model="selectMonth"
    >
      <option :value="tecMonth">{{ tecNameMonth }}</option>
      <option v-for="month in months" :key="month.id + 'mnf'" :value="month.id">
        {{ month.title }}
      </option>
    </select>
    <button
      class="btn btn-outline-secondary"
      type="button"
      @click="selectMonth++"
      :disabled="selectMonth > 11"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-arrow-right-short"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
        />
      </svg>
    </button>
  </div>
</template>

<script>
import months from '@/data/dataMonths'

export default {
  data() {
    return {
      months,
      tecMonth: new Date().getMonth() + 1,
      selectMonth: new Date().getMonth() + 1
    }
  },
  computed: {
    tecNameMonth() {
      return this.months.find(item => item.id === this.tecMonth).title
    }
  }
}
</script>