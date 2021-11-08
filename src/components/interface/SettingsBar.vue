<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="settingsBar"
    aria-labelledby="settingsBarLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="settingsBarLabel">Настройки</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <button
        @click.prevent="logOut"
        class="btn btn-sm btn-light border p-0 ps-3 pe-3"
        title="Выйти из системы"
      >
        Выйти
      </button>
      <hr class="mt-2" />
      <h6 class="mt-4">Что отображать?</h6>
      <ul class="list-group list-group-flush">
        <li
          v-for="(item, index) in settings"
          :key="index"
          class="list-group-item"
        >
          <div
            class="
              form-check form-switch
              d-flex
              justify-content-between
              align-items-senter
              ps-0
            "
          >
            <label class="form-check-label" :for="item.alias">{{
              item.title
            }}</label>
            <input
              class="form-check-input"
              type="checkbox"
              role="switch"
              :id="item.alias"
              checked
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import getSettings from '@/scripts/getSettings'
export default {
  data() {
    return {
      getSettings
    }
  },
  computed: {
    settings() {
      return this.$store.getters.settings
    }
  },
  mounted() {
    console.log('settings:', this.settings) // Зачем?
  },
  methods: {
    async logOut() {
      await this.$store.dispatch('logOut')
    }
  }
}
</script>