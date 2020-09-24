<template>
  <div class="bg-white shadow-sm p-3 pt-3 settings">
    <h5 class="text-center">Настройки</h5>
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
        <small>Завершенные</small>
      </label>
    </div>
    <div class="form-group form-check mb-1">
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
    </div>

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

    <div class="form-group">
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
    </div>
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
      sortBy: '',
    }
  },
  computed: {
    settings() {
      return this.$store.getters.settings
    },
  },

  mounted() {
    this.updateValue()
  },
  methods: {
    saveChanges() {
      this.$store.commit('updateSettings', {
        showArhived: this.showArhived,
        showEmpty: this.showEmpty,
        showPosition: this.showPosition,
        showDate: this.showDate,
        showDeadline: this.showDeadline,
        showNaprav: this.showNaprav,
        showProject: this.showProject,
        showPrice: this.showPrice,
        sortBy: this.sortBy,
      })
    },
    updateValue() {
      this.showArhived = this.settings.showArhived
      this.showEmpty = this.settings.showEmpty
      this.sortBy = this.settings.sortBy
      this.showPosition = this.settings.showPosition
      this.showDate = this.settings.showDate
      this.showDeadline = this.settings.showDeadline
      this.showNaprav = this.settings.showNaprav
      this.showProject = this.settings.showProject
      this.showPrice = this.settings.showPrice
    },
  },
  watch: {
    settings() {
      this.updateValue()
    },
  },
}
</script>

<style scoped>
.settings {
  z-index: 99;
}

.form-check-label {
  line-height: 1.2;
}
</style>