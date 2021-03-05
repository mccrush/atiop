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
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-light text-secondary"
              :class="{ active: viewType === 'napravs' }"
              @click="setViewType('napravs')"
            >
              {{ napravTitle }}
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-light dropdown-toggle dropdown-toggle-split text-secondary"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="dropdownNaprav"
            ></button>
            <ul class="dropdown-menu" aria-labelledby="dropdownNaprav">
              ... List napravs
            </ul>
          </div>

          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-light text-secondary"
              :class="{ active: viewType === 'projects' }"
              @click="setViewType('projects')"
            >
              {{ projectTitle }}
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-light dropdown-toggle dropdown-toggle-split text-secondary"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="dropdownProject"
            ></button>
            <ul class="dropdown-menu" aria-labelledby="dropdownProject">
              ... List projects
            </ul>
          </div>

          <button
            type="button"
            class="btn btn-outline-light text-secondary"
            :class="{
              active: viewType === 'tasks'
            }"
            @click="setViewType('tasks')"
          >
            Задач
          </button>
        </div>

        <div class="dropdown">
          <button
            class="btn btn-sm btn-outline-light text-secondary dropdown-toggle me-3"
            type="button"
            id="dropdownFilter"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Filter
          </button>
          <ul
            class="dropdown-menu bg-white border-0 shadow p-3 pt-2"
            aria-labelledby="dropdownFilter"
          >
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div>
        <div>
          <AddItem v-if="viewType === 'napravs'" :type="'napravs'" />
        </div>
        <div>
          <AddItem v-if="napravId && !projectId" :type="'projects'" />
        </div>
        <div>
          <AddItem v-if="projectId" :type="'lists'" />
        </div>
      </div>

      <div class="d-none d-md-flex align-items-center">
        <Loading2 v-if="loading2" />
        <div
          v-if="viewType === 'tasks'"
          class="btn-group btn-group-sm me-3"
          role="group"
          aria-label="Basic example"
        >
          <!-- <button
            v-if="viewType === 'napravs' || viewType === 'projects'"
            type="button"
            class="btn btn-outline-light text-secondary"
            :class="{ active: viewView === 'kanban' }"
            @click="setViewView('kanban')"
          >
            Кан
          </button> -->
          <button
            v-if="viewType === 'tasks'"
            type="button"
            class="btn btn-outline-light text-secondary"
            :class="{ active: viewView === 'cards' }"
            @click="setViewView('cards')"
          >
            Кар
          </button>
          <button
            v-if="viewType === 'tasks'"
            type="button"
            class="btn btn-outline-light text-secondary"
            :class="{ active: viewView === 'checklist' }"
            @click="setViewView('checklist')"
          >
            Чек
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
import AddItem from '@/components/item/AddItem'

export default {
  components: {
    SettingsDrop,
    Loading2,
    AddItem
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
    napravs() {
      return this.$store.getters.napravs2
    },
    projects() {
      return this.$store.getters.projects2
    },
    napravId() {
      return this.$store.getters.napravId
    },
    projectId() {
      return this.$store.getters.projectId
    },
    napravTitle() {
      if (this.napravId && this.napravs.length) {
        return this.napravs.find(item => item.id === this.napravId).title
      }
      return 'Направление'
    },
    projectTitle() {
      if (this.projectId && this.projects.length) {
        return this.projects.find(item => item.id === this.projectId).title
      }
      return 'Проект'
    }
  },
  methods: {
    setViewType(type) {
      if (type === 'napravs') {
        this.$store.commit('setId', { id: '', typeId: 'napravId' })
        this.$store.commit('setId', { id: '', typeId: 'projectId' })
        this.$store.commit('setId', { id: '', typeId: 'listId' })
        this.$store.commit('setViewView', 'kanban')
      }
      if (type === 'projects') {
        this.$store.commit('setId', { id: '', typeId: 'projectId' })
        this.$store.commit('setId', { id: '', typeId: 'listId' })
        this.$store.commit('setViewView', 'kanban')
      }
      if (type === 'tasks') {
        this.$store.commit('setViewView', 'cards')
      }
      this.$store.commit('setViewType', type)
    },
    setViewView(view) {
      this.$store.commit('setViewView', view)
    }
  }
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