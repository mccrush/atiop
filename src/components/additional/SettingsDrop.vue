<template>
  <div class="bg-white border-0 shadow p-3 pt-2 mt-2 settings-form">
    <h5 class="text-center">Настройки</h5>
    <!-- <a
      href="/user"
      class="btn btn-sm btn-light border p-0 ps-2 pe-2 me-2"
      title="Настройки аккаунта"
      >Аккаунт</a
    > -->
    <button
      @click.prevent="logOut"
      class="btn btn-sm btn-light border p-0 ps-3 pe-3"
      title="Выйти из системы"
    >
      Выйти
    </button>
    <hr class="mt-2 mb-1" />

    <table class="table table-sm text-center text-white mb-0">
      <tr>
        <td class="w-25"><span class="d-block badge bg-info">N</span></td>
        <td class="w-25"><span class="d-block badge bg-success">P</span></td>
        <td class="w-25">
          <span class="d-block badge bg-light text-dark">L</span>
        </td>
        <td class="w-25">
          <span class="d-block badge bg-warning">T-{{ tasksLength }}</span>
        </td>
      </tr>
      <tr>
        <td>
          <span class="d-block border badge bg-light text-dark">{{
            napravsLength
          }}</span>
        </td>
        <td>
          <span class="d-block border badge bg-light text-dark">{{
            projectsLength
          }}</span>
        </td>
        <td>
          <span class="d-block border badge bg-light text-dark">{{
            listsLength
          }}</span>
        </td>
        <td>
          <span class="badge bg-warning">{{ tasksTodoWorkLength }}</span>
          <span class="border badge bg-light text-dark">{{
            tasksDoneLength
          }}</span>
        </td>
      </tr>
    </table>
    <hr class="mt-2 mb-1" />
    <small>Показывать</small>
    <div class="form-group form-check mb-1">
      <input
        type="checkbox"
        class="form-check-input"
        id="arhived"
        v-model="showArhived"
        @change="saveChanges"
      />
      <label for="arhived" class="form-check-label">
        <small>Завершенные задачи</small>
      </label>
    </div>
    <!-- <div class="form-group form-check mb-1">
      <input
        type="checkbox"
        class="form-check-input"
        id="empty"
        v-model="showEmpty"
        @change="saveChanges"
      />
      <label for="empty" class="form-check-label">
        <small>Проекты без задач</small>
      </label>
    </div> -->
    <hr class="mt-2 mb-1" />
    <small>Показывать метки</small>
    <div class="form-group form-check mb-1">
      <input
        type="checkbox"
        class="form-check-input"
        id="poeition"
        v-model="showPosition"
        @change="saveChanges"
      />
      <label for="poeition" class="form-check-label">
        <small>Позицию</small>
      </label>
    </div>

    <div class="form-group form-check mb-1">
      <input
        type="checkbox"
        class="form-check-input"
        id="date"
        v-model="showDate"
        @change="saveChanges"
      />
      <label for="date" class="form-check-label">
        <small>Дату</small>
      </label>
    </div>

    <div class="form-group form-check mb-1">
      <input
        type="checkbox"
        class="form-check-input"
        id="deadline"
        v-model="showDeadline"
        @change="saveChanges"
      />
      <label for="deadline" class="form-check-label">
        <small>Дедлайн</small>
      </label>
    </div>

    <div class="form-group form-check mb-1">
      <input
        type="checkbox"
        class="form-check-input"
        id="naprav"
        v-model="showNaprav"
        @change="saveChanges"
      />
      <label for="naprav" class="form-check-label">
        <small>Направление</small>
      </label>
    </div>

    <div class="form-group form-check mb-2">
      <input
        type="checkbox"
        class="form-check-input"
        id="project"
        v-model="showProject"
        @change="saveChanges"
      />
      <label for="project" class="form-check-label">
        <small>Проект</small>
      </label>
    </div>

    <div class="form-group form-check mb-2">
      <input
        type="checkbox"
        class="form-check-input"
        id="price"
        v-model="showPrice"
        @change="saveChanges"
      />
      <label for="price" class="form-check-label">
        <small>Цену</small>
      </label>
    </div>

    <div class="form-group form-check mb-2">
      <input
        type="checkbox"
        class="form-check-input"
        id="time"
        v-model="showTime"
        @change="saveChanges"
      />
      <label for="time" class="form-check-label">
        <small>Время</small>
      </label>
    </div>

    <!-- <div class="form-group">
      <small>Способ сортировки</small>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          id="exampleRadios1"
          value="date"
          :checked="sortBy == 'date'"
          v-model="sortBy"
          @change="saveChanges"
        />
        <label class="form-check-label" for="exampleRadios1">
          <small>По дате</small>
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          id="exampleRadios2"
          value="deadline"
          :checked="sortBy == 'deadline'"
          v-model="sortBy"
          @change="saveChanges"
        />
        <label class="form-check-label" for="exampleRadios2">
          <small>По дедлайну</small>
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          id="exampleRadios3"
          value="position"
          :checked="sortBy == 'position'"
          v-model="sortBy"
          @change="saveChanges"
        />
        <label class="form-check-label" for="exampleRadios3">
          <small>По позиции</small>
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          id="exampleRadios4"
          value="price"
          :checked="sortBy == 'price'"
          v-model="sortBy"
          @change="saveChanges"
        />
        <label class="form-check-label" for="exampleRadios4">
          <small>По цене</small>
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          id="exampleRadios5"
          value="time"
          :checked="sortBy == 'time'"
          v-model="sortBy"
          @change="saveChanges"
        />
        <label class="form-check-label" for="exampleRadios5">
          <small>По времени</small>
        </label>
      </div>
      <div class="btn-group w-100" role="group" aria-label="Basic example">
        <button
          type="button"
          class="btn btn-sm btn-light border p-0 ps-1 pe-1 w-50"
          :class="{ active: sortUp }"
          @click="saveChanges(true)"
        >
          Возраст
        </button>
        <button
          type="button"
          class="btn btn-sm btn-light border p-0 ps-1 pe-1 w-50"
          :class="{ active: !sortUp }"
          @click="saveChanges(false)"
        >
          Убыван
        </button>
      </div>
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      showArhived: null,
      showEmpty: null,
      showPosition: null,
      showDate: null,
      showDeadline: null,
      showNaprav: null,
      showProject: null,
      showPrice: null,
      showTime: null,
      sortBy: '',
      sortUp: true
    }
  },
  computed: {
    settings() {
      return this.$store.getters.settings
    },
    napravsLength() {
      return this.$store.getters.napravsLength
    },
    projectsLength() {
      return this.$store.getters.projectsLength
    },
    listsLength() {
      return this.$store.getters.listsLength
    },
    tasksLength() {
      return this.$store.getters.tasksLength
    },
    tasksTodoWorkLength() {
      return this.$store.getters.tasksTodoWorkLength
    },
    tasksDoneLength() {
      return this.$store.getters.tasksDoneLength
    }
  },

  mounted() {
    this.updateValue()
  },
  methods: {
    async logOut() {
      await this.$store.dispatch('logOut')
    },
    saveChanges(sortUp) {
      this.sortUp = sortUp
      this.$store.commit('updateSettings', {
        showArhived: this.showArhived,
        showEmpty: this.showEmpty,
        showPosition: this.showPosition,
        showDate: this.showDate,
        showDeadline: this.showDeadline,
        showNaprav: this.showNaprav,
        showProject: this.showProject,
        showPrice: this.showPrice,
        showTime: this.showTime,
        sortBy: this.sortBy,
        sortUp: this.sortUp
      })
    },
    updateValue() {
      this.showArhived = this.settings.showArhived
      this.showEmpty = this.settings.showEmpty
      this.sortBy = this.settings.sortBy
      this.sortUp = this.settings.sortUp
      this.showPosition = this.settings.showPosition
      this.showDate = this.settings.showDate
      this.showDeadline = this.settings.showDeadline
      this.showNaprav = this.settings.showNaprav
      this.showProject = this.settings.showProject
      this.showPrice = this.settings.showPrice
      this.showTime = this.settings.showTime
    }
  },
  watch: {
    settings() {
      this.updateValue()
    }
  }
}
</script>

<style scoped>
.settings-form {
  width: 224px;
  height: calc(100vh - 60px);
  max-height: 655px;
  margin-right: -12px;
  overflow-y: auto;
}

.form-check-label {
  line-height: 1.2;
}
</style>