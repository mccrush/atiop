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
      <button
        class="btn btn-sm btn-outline-light text-secondary me-3"
        @click="selectToday"
      >
        Сегодня
      </button>
      <div
        class="btn-group btn-group-sm me-3"
        role="group"
        aria-label="Select Month"
      >
        <button
          type="button"
          class="btn btn-outline-light text-secondary pt-0"
          @click="downMonth"
        >
          <ButtonLeft />
        </button>
        <button
          type="button"
          class="btn btn-outline-light text-secondary pt-0"
          @click="upMonth"
        >
          <ButtonRight />
        </button>
      </div>

      <div class="dropdown">
        <button
          class="
            select-new-month
            btn btn-sm btn-outline-light
            text-secondary
            dropdown-toggle
          "
          type="button"
          id="selectNewMonth"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          {{ selectMonthName }} {{ selectYear }}
        </button>
        <div
          class="dropdown-menu lh-1 shadow border-0 p-2"
          aria-labelledby="selectNewMonth"
        >
          Мини-календарь еще не готов
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
          v-for="(day, index) in countDays"
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
import ButtonLeft from '@/components/calendar/ButtonLeft'
import ButtonRight from '@/components/calendar/ButtonRight'
import months from '@/data/dataMonths'
import dayWeek from '@/data/dataDayWeek'

export default {
  components: {
    ButtonLeft,
    ButtonRight
  },
  data() {
    return {
      months,
      dayWeek,
      todayWeekDay: new Date().getDay(),
      todaytMonth: new Date().getMonth(),
      todayYear: new Date().getFullYear(),
      selectMonth: new Date().getMonth(),
      selectYear: new Date().getFullYear()
    }
  },
  computed: {
    countDays() {
      return this.months.find(item => item.id === this.selectMonth).countdays
    },
    selectMonthName() {
      return this.months.find(item => item.id === this.selectMonth).title
    },
    todayWeekDayName() {
      return this.dayWeek.find(item => item.id === this.todayWeekDay).title
    },
    todaytMonthName() {
      return this.months.find(item => item.id === this.todaytMonth).title
    }
  },
  methods: {
    upMonth() {
      if (this.selectMonth === 11) {
        this.selectMonth = 0
        this.selectYear++
      } else {
        this.selectMonth++
      }
    },
    downMonth() {
      if (this.selectMonth === 0) {
        this.selectMonth = 11
        this.selectYear--
      } else {
        this.selectMonth--
      }
    },
    selectToday() {
      this.selectMonth = this.todaytMonth
      this.selectYear = this.todayYear
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

.calendar-day {
  height: calc((100vh - 59px - 54px - 26px) / 5);
}

.left-padding-1 {
  width: 4px;
  height: 22px;
}

.left-padding-2 {
  width: 4px;
  height: calc(100vh - 59px - 54px - 26px);
}

.select-new-month {
  width: 128px;
}
</style>

