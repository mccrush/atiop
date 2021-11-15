<template>
  <div class="calendar row bg-white align-content-start">
    <div
      class="
        select-pole
        col-12
        bg-white
        d-flex
        justify-content-center
        pt-2
        pb-2
      "
    >
      <!-- <SelectYear />
      <SelectMonth @select-month="getMonths" /> -->
      <button class="btn btn-outline-light text-secondary me-3">Сегодня</button>
      <div class="btn-group me-3" role="group" aria-label="Select Month">
        <button type="button" class="btn btn-outline-light text-secondary">
          Left
        </button>
        <button type="button" class="btn btn-outline-light text-secondary">
          Right
        </button>
      </div>

      <div class="dropdown">
        <button
          class="btn btn-outline-light text-secondary dropdown-toggle"
          type="button"
          id="selectNewMonth"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ todaytMonthName }} {{ todayYear }}
        </button>
        <div class="dropdown-menu" aria-labelledby="selectNewMonth">
          Mini calendar
        </div>
      </div>
    </div>
    <div class="calendar-days col-12">
      <div class="row ps-1">
        <div
          v-for="(dayW, index) in dayWeek"
          :key="dayW.id + 'dw'"
          class="calendar-day-week border-top border-end small text-muted"
          :class="{
            'border-start': index === 0
          }"
        >
          <small> {{ dayW.title }}</small>
        </div>
      </div>
      <div class="row ps-1">
        <div
          v-for="(day, index) in 25"
          :key="day + 'cd'"
          class="calendar-day border-end border-bottom small text-muted"
          :class="{
            'border-start':
              index === 0 ||
              index === 7 ||
              index === 14 ||
              index === 21 ||
              index === 28
          }"
        >
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
      todayWeekDay: new Date().getDay(),
      todaytMonth: new Date().getMonth(),
      todayYear: new Date().getFullYear()
    }
  },
  computed: {
    countDays() {
      //return this.months.find(item => item.id === this.todaytMonth).countdays
    },
    todayWeekDayName() {
      return this.dayWeek.find(item => item.id === this.todayWeekDay).title
    },
    todaytMonthName() {
      return this.months.find(item => item.id === this.todaytMonth).title
    }
  },
  methods: {}
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

.calendar-day {
  height: calc((100vh - 59px - 54px - 26px) / 4);
}

.left-padding-1 {
  width: 4px;
  height: 22px;
}

.left-padding-2 {
  width: 4px;
  height: calc(100vh - 59px - 54px - 26px);
}
</style>

