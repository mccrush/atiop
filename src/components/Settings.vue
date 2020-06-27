<template>
  <div class="bg-white shadow-sm p-3 pt-3">
    <h5 class="text-center">Настройки</h5>
    <div class="form-group form-check mt-3 mb-2">
      <input
        type="checkbox"
        class="form-check-input"
        id="arhived"
        v-model="showArhived"
        @change="saveChanges"
      />
      <label for="arhived" class="form-check-label">
        <small>Показывать архивные</small>
      </label>
    </div>
    <div class="form-group form-check mt-3 mb-2">
      <input
        type="checkbox"
        class="form-check-input"
        id="arhived"
        v-model="showEmpty"
        @change="saveChanges"
      />
      <label for="arhived" class="form-check-label">
        <small>Показывать проекты без задач</small>
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
          value="position"
          :checked="sortBy == 'position'"
          v-model="sortBy"
          @change="saveChanges"
        />
        <label class="form-check-label" for="exampleRadios2">
          <small>По порядку</small>
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
      sortBy: ''
    }
  },
  methods: {
    saveChanges() {
      this.$store.commit('updateSettings', {
        showArhived: this.showArhived,
        showEmpty: this.showEmpty,
        sortBy: this.sortBy
      })
    }
  },
  computed: {
    settings() {
      return this.$store.getters.settings
    }
  },
  mounted() {
    this.showArhived = this.settings.showArhived
    this.showEmpty = this.settings.showEmpty
    this.sortBy = this.settings.sortBy
  }
}
</script>