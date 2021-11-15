<template>
  <div class="calendar row bg-light align-content-start">
    <div
      class="
        select-pole
        col-12
        bg-white
        d-flex
        justify-content-around
        pt-2
        pb-2
      "
    >
      <SelectYear />
      <SelectMonth @select-month="getMonths" />
    </div>
    <div class="calendar-days col-12">
      <div class="row">
        <div v-for="day in dayWeek" :key="day" class="calendar-day-week border">
          {{ day }}
        </div>
      </div>
      <div class="row">
        <div v-for="day in countDays" :key="day" class="calendar-day border">
          {{ day }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectYear from '@/components/calendar/SelectYear'
import SelectMonth from '@/components/calendar/SelectMonth'
import months from '@/data/dataMonths'
import dayWeek from '@/data/dataDayWeek'

export default {
  components: {
    SelectYear,
    SelectMonth
  },
  data() {
    return {
      months,
      dayWeek,
      selectMonth: new Date().getMonth() + 1
    }
  },
  computed: {
    countDays() {
      return this.months.find(item => item.id === this.selectMonth).countdays
    }
  },
  methods: {
    getMonths({ month }) {
      console.log('get new month:', month)
      this.selectMonth = month
    }
  }
}
</script>


<style scoped>
.calendar {
  height: calc(100vh - 59px);
}

/* .select-pole {
  height: 56px;
} */

.calendar-day,
.calendar-day-week {
  width: 14.2%;
  text-align: center;
}
</style>

