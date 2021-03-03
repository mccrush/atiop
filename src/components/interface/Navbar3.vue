<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
    <div class="container-fluid">
      <a class="d-none d-md-block navbar-brand" href="#about">
        <img
          src="/img/icons/logo_8.svg"
          height="26"
          class="d-inline-block mb-1 me-1"
          alt="ATIOP"
        />
        ATIOP
      </a>

      <button
        class="opacity-06 navbar-toggler border-0 ps-0 pe-0"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <a class="d-md-none navbar-brand me-0" href="#about">
        <img
          src="/img/icons/logo_8.svg"
          height="26"
          class="d-inline-block mb-1 me-0"
          alt="ATIOP"
        />
      </a>

      <div class="d-flex d-md-none align-items-center">
        <Loading2 v-if="loading2" />
        <div class="dropdown">
          <button
            class="btn btn-sm p-0 me-1 opacity-06"
            title="Настройки"
            id="dropdownMenuSettings"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="/img/icons_tool/gear.svg"
              width="24"
              height="24"
              alt="Настройки"
            />
          </button>

          <transition name="slide-fade">
            <SettingsDrop
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuSettings"
            />
          </transition>
        </div>
      </div>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Collapse content -->
        <div
          class="btn-group btn-group-sm me-3"
          role="group"
          aria-label="Basic example"
        >
          <button
            type="button"
            class="btn btn-outline-light text-secondary"
            :class="{ active: viewType === 'napravs' }"
            @click="setViewType('napravs')"
          >
            Направления
          </button>
          <button
            type="button"
            class="btn btn-outline-light text-secondary"
            :class="{ active: viewType === 'projects' }"
            @click="setViewType('projects')"
          >
            Проекты
          </button>
          <button
            type="button"
            class="btn btn-outline-light text-secondary"
            :class="{
              active: viewType === 'tasks',
              disabled: viewView === 'kanban',
            }"
            @click="setViewType('tasks')"
          >
            Задачи
          </button>
        </div>

        <div class="dropdown">
          <button
            class="btn btn-sm btn-outline-light text-secondary dropdown-toggle"
            type="button"
            id="dropdownFilter"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter
          </button>
          <ul
            class="dropdown-menu bg-white border-0 shadow p-3 pt-2"
            aria-labelledby="dropdownMenuButton1"
          >
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
      </div>

      <div class="d-none d-md-flex align-items-center">
        <Loading2 v-if="loading2" />
        <div
          class="btn-group btn-group-sm me-3"
          role="group"
          aria-label="Basic example"
        >
          <button
            type="button"
            class="btn btn-outline-light text-secondary"
            :class="{
              active: viewView === 'kanban',
              disabled: viewType === 'tasks',
            }"
            @click="setViewView('kanban')"
          >
            Канбан
          </button>
          <button
            type="button"
            class="btn btn-outline-light text-secondary"
            :class="{ active: viewView === 'cards' }"
            @click="setViewView('cards')"
          >
            Карточки
          </button>
          <button
            type="button"
            class="btn btn-outline-light text-secondary"
            :class="{ active: viewView === 'checklist' }"
            @click="setViewView('checklist')"
          >
            Чеклист
          </button>
        </div>

        <div class="dropdown">
          <button
            class="btn btn-sm p-0 me-1 opacity-06"
            title="Настройки"
            id="dropdownMenuSettings"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src="/img/icons_tool/gear.svg"
              width="24"
              height="24"
              alt="Настройки"
            />
          </button>
          <transition name="slide-fade">
            <SettingsDrop
              class="dropdown-menu dropdown-menu-end"
              aria-labelledby="dropdownMenuSettings"
            />
          </transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { Dropdown } from 'bootstrap' // Без него не работает Dropdown
import SettingsDrop from '@/components/additional/SettingsDrop'
import Loading2 from '@/components/additional/Loading2'

export default {
  components: {
    SettingsDrop,
    Loading2,
  },
  computed: {
    loading2() {
      return this.$store.getters.loading2
    },
    viewType() {
      return this.$store.getters.viewType
    },
    viewView() {
      return this.$store.getters.viewView
    },
  },
  methods: {
    setViewType(type) {
      if (type === 'napravs') {
        this.$store.commit('setId', { id: '', typeId: 'napravId' })
        this.$store.commit('setId', { id: '', typeId: 'projectId' })
        this.$store.commit('setId', { id: '', typeId: 'listId' })
      }
      if (type === 'projects') {
        this.$store.commit('setId', { id: '', typeId: 'projectId' })
        this.$store.commit('setId', { id: '', typeId: 'listId' })
      }
      this.$store.commit('setViewType', type)
    },
    setViewView(view) {
      this.$store.commit('setViewView', view)
    },
  },
}
</script>

<style scoped>
.navbar-brand {
  font-weight: 600;
}

.opacity-04 {
  opacity: 0.4;
}

.opacity-06 {
  opacity: 0.6;
}
</style>