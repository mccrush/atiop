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
        <ButtonLeft @click="downMonth" />
        <ButtonRight @click="upMonth" />
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
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          {{ selectMonthName }} {{ selectYear }}
        </button>
        <div
          class="dropdown-menu lh-1 shadow border-0 p-2"
          aria-labelledby="selectNewMonth"
        >
          <div class="select-year">
            <div
              class="btn-group btn-group-sm w-100 me-3"
              role="group"
              aria-label="Select Month"
            >
              <ButtonLeft @click="selectYear--" class="w-25" />
              <button class="btn btn-outline-light text-dark w-50" disabled>
                {{ selectYear }}
              </button>
              <ButtonRight @click="selectYear++" class="w-25" />
            </div>
          </div>
          <div class="select-month row p-2 pb-0">
            <div
              v-for="(mnf, index) in months"
              :key="mnf.id + 'mnf'"
              class="col-4 p-1 pe-0 pb-0"
              :class="{
                'pe-1':
                  index === 2 || index === 5 || index === 8 || index === 11
              }"
            >
              <button
                type="button"
                class="btn btn-sm btn-outline-light text-secondary w-100"
                @click="selectMonth = mnf.id"
              >
                <small> {{ mnf.title.slice(0, 3).toUpperCase() }}</small>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="calendar-days col-12">
      <div class="row ps-2 ps-xxl-3">
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
      <div class="row ps-2 ps-xxl-3">
        <div
          v-for="dayPre in firstWeekDayMonth"
          :key="dayPre + 'cd'"
          class="
            calendar-day calendar-day-height-5
            border-start border-end border-bottom
            small
            text-muted
          "
          :class="{
            'calendar-day-height-6': firstWeekDayMonth > 4 && countDays > 30
          }"
        ></div>
        <div
          v-for="day in countDays"
          :key="day + 'cd'"
          class="
            calendar-day calendar-day-height-5
            border-start border-end border-bottom
            small
            text-muted
            ps-1
            pe-1
          "
          :class="{
            'calendar-day-height-6': firstWeekDayMonth > 4 && countDays > 30
          }"
        >
          <span
            :class="{
              'fw-bold text-dark':
                selectYear == todayYear &&
                selectMonth == todaytMonth &&
                day == todayDate
            }"
            >{{ day }}</span
          ><br />
          <div
            v-for="task in showDateTask(day)"
            :key="task.id"
            class="task-in-day badge bg-light text-muted text-start w-100"
            @dblclick.prevent="
              $emit('edit-item', { id: task.id, type: 'tasks' })
            "
          >
            {{ task.title }}
          </div>
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
      todayDate: new Date().getDate(),
      todayWeekDay: new Date().getDay() + 1,
      todaytMonth: new Date().getMonth(),
      todayYear: new Date().getFullYear(),
      selectMonth: new Date().getMonth(),
      selectYear: new Date().getFullYear()
    }
  },
  computed: {
    tasks() {
      return this.$store.getters.tasks
        .filter(item => item.status !== 'done')
        .filter(item => item.date !== '')
    },
    countDays() {
      return this.months.find(item => item.id === this.selectMonth).countdays
    },
    selectMonthName() {
      return this.months.find(item => item.id === this.selectMonth).title
    },
    // todayWeekDayName() {
    //   return this.dayWeek.find(item => item.id === this.todayWeekDay).title
    // },
    todaytMonthName() {
      return this.months.find(item => item.id === this.todaytMonth).title
    },
    firstWeekDayMonth() {
      if (new Date(this.selectYear, this.selectMonth, 1).getDay() === 0) {
        return 6
      } else {
        return new Date(this.selectYear, this.selectMonth, 1).getDay() - 1
      }
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
    },
    showDateTask(date) {
      return this.tasks.filter(
        item =>
          new Date(item.date).getFullYear() ===
            new Date(this.selectYear, this.selectMonth, date).getFullYear() &&
          new Date(item.date).getMonth() ===
            new Date(this.selectYear, this.selectMonth, date).getMonth() &&
          new Date(item.date).getDate() ===
            new Date(this.selectYear, this.selectMonth, date).getDate()
      )
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
  margin-right: -1px;
  overflow-y: auto;
}

.calendar-day-height-5 {
  height: calc((100vh - 59px - 54px - 26px) / 5);
}

.calendar-day-height-6 {
  height: calc((100vh - 59px - 54px - 26px) / 6);
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

.task-in-day {
  user-select: none;
  cursor: pointer;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>

