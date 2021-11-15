<template>
  <div class="input-group w-25">
    <button
      class="btn btn-outline-secondary"
      type="button"
      @click="selectYear--"
      :disabled="selectYear <= tecYear"
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
    <select class="form-select" aria-label="Select year" v-model="selectYear">
      <option :value="tecYear">{{ tecYear }}</option>
      <option v-for="year in years" :key="year" :value="year">
        {{ year }}
      </option>
    </select>
    <button
      class="btn btn-outline-secondary"
      type="button"
      @click="selectYear++"
      :disabled="selectYear > tecYear + 4"
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
export default {
  data() {
    return {
      tecYear: new Date().getFullYear(),
      selectYear: new Date().getFullYear()
    }
  },
  computed: {
    years() {
      let arr = []
      const yearSet = new Date().getFullYear()
      for (let i = 1; i < 6; i++) {
        arr.push(yearSet + i)
      }
      return arr
    }
  }
}
</script>