<template>
  <div class="settings bg-white shadow-sm p-3 pt-3" :class="{'width-0': !show}">
    <div class="button-close">
      <h2 class="m-0 pb-2 pl-3 pr-3" @click="show = !show">&equiv;</h2>
    </div>

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
      show: false,
      showArhived: null,
      sortBy: ''
    }
  },
  methods: {
    saveChanges() {
      this.$store.dispatch('updateSettings', {
        showArhived: this.showArhived,
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
    this.sortBy = this.settings.sortBy
  }
}
</script>

<style scoped>
.settings {
  width: 200px;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0px;
  transition: 0.5s;
}

.width-0 {
  right: -200px;
}

.button-close {
  cursor: pointer;
  position: absolute;
  left: -56px;
  top: 0;
}
</style>