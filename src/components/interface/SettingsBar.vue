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
      <div class="d-flex justify-content-between">
        <div class="d-flex rounded bg-white shadow-sm text-secondary p-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              class="bi bi-person-circle"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fill-rule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          </div>
          <h6 v-if="userEmail" class="lh-1 align-self-center m-0 ms-2">
            {{ userEmail }}
          </h6>
        </div>
        <div>
          <button
            @click.prevent="logOut"
            class="
              btn btn-lg btn-outline-light
              border
              text-secondary
              h-100
              p-0
              ps-3
              pe-3
            "
            title="Выйти из системы"
          >
            Выйти
          </button>
        </div>
      </div>

      <hr class="mt-2" />
      <TaskStatistics />
      <h6 class="mt-4">Что отображать?</h6>
      <ul class="list-group list-group-flush">
        <li
          v-for="(item, index) in settingsArr"
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
              :checked="item.value"
              @change="updateSettings(index)"
            />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import TaskStatistics from '@/components/additional/TaskStatistics'
export default {
  components: {
    TaskStatistics
  },
  computed: {
    settingsArr() {
      return this.$store.getters.settingsArr
    },
    userEmail() {
      return this.$store.getters.userEmail
    }
  },
  methods: {
    updateSettings(index) {
      this.$store.commit('updateValue', { index })
    },
    async logOut() {
      let offCan = new Offcanvas(document.getElementById('settingsBar'))
      offCan.hide()
      await this.$store.dispatch('logOut')
    }
  }
}
</script>

<style scoped>
.userpic {
  height: 24px;
}
</style>