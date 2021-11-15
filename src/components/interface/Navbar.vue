<template>
  <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
    <div v-if="userId" class="container-fluid">
      <div class="d-none d-md-block navbar-brand">
        <img
          src="/img/icons/logo_8.svg"
          height="26"
          class="d-inline-block mb-1 me-1"
          alt="ATIOP"
        />
        ATIOP
      </div>

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

      <div class="d-md-none navbar-brand me-0">
        <img
          src="/img/icons/logo_8.svg"
          height="26"
          class="d-inline-block mb-1 me-0"
          alt="ATIOP"
        />
      </div>

      <div class="d-flex d-md-none align-items-center">
        <Loading v-if="loading" />
        <div class="dropdown">
          <button
            class="btn btn-sm p-0 me-1 opacity-06"
            title="Настройки"
            data-bs-toggle="offcanvas"
            data-bs-target="#settingsBar"
            aria-controls="settingsBar"
          >
            <img
              src="/img/icons_tool/gear.svg"
              width="24"
              height="24"
              alt="Настройки"
            />
          </button>
        </div>
      </div>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <!-- Collapse content -->

        <!-- PersonPlan & Calendar -->
        <div
          class="btn-group btn-group-sm ms-md-3 mt-2 mt-md-0 me-3"
          role="group"
          aria-label="Boost butoons"
        >
          <button
            type="button"
            class="btn btn-sm btn-outline-light text-secondary ps-2 pt-0 pe-2"
            :class="{
              active: viewType === 'person'
            }"
            @click="setSelectPerson()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-lightning-charge-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"
              />
            </svg>
          </button>
          <button class="btn ps-0 pe-0">&nbsp;</button>
          <button
            class="btn btn-outline-light btn-sm text-secondary ps-2 pt-0 pe-2"
            :class="{
              active: viewType === 'calendar'
            }"
            @click="setSelectCalendar()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-calendar2-date"
              viewBox="0 0 16 16"
            >
              <path
                d="M6.445 12.688V7.354h-.633A12.6 12.6 0 0 0 4.5 8.16v.695c.375-.257.969-.62 1.258-.777h.012v4.61h.675zm1.188-1.305c.047.64.594 1.406 1.703 1.406 1.258 0 2-1.066 2-2.871 0-1.934-.781-2.668-1.953-2.668-.926 0-1.797.672-1.797 1.809 0 1.16.824 1.77 1.676 1.77.746 0 1.23-.376 1.383-.79h.027c-.004 1.316-.461 2.164-1.305 2.164-.664 0-1.008-.45-1.05-.82h-.684zm2.953-2.317c0 .696-.559 1.18-1.184 1.18-.601 0-1.144-.383-1.144-1.2 0-.823.582-1.21 1.168-1.21.633 0 1.16.398 1.16 1.23z"
              />
              <path
                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM2 2a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H2z"
              />
              <path
                d="M2.5 4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H3a.5.5 0 0 1-.5-.5V4z"
              />
            </svg>
          </button>
        </div>
        <!-- -->

        <div
          class="btn-group btn-group-sm mt-2 mt-md-0 me-3"
          role="group"
          aria-label="Filter"
        >
          <div class="btn-group">
            <button
              type="button"
              class="
                my-select-btn-pj
                btn btn-sm btn-outline-light
                text-secondary
              "
              :class="{ active: viewType === 'napravs' }"
              @click="setActiveNapravs(napravId)"
            >
              {{ napravTitle }}
            </button>
            <button
              type="button"
              class="
                btn btn-sm btn-outline-light
                dropdown-toggle dropdown-toggle-split
                text-secondary
              "
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="dropdownNaprav"
              :disabled="!napravs.length"
            ></button>
            <ul
              class="dropdown-menu border-0 shadow"
              aria-labelledby="dropdownNaprav"
            >
              <li
                v-if="viewType !== 'napravs'"
                class="dropdown-item"
                @click="setShowNapravs()"
              >
                Отобразить направления
              </li>
              <li v-if="viewType !== 'napravs'">
                <hr class="dropdown-divider" />
              </li>
              <li
                v-if="napravId && viewType !== 'napravs'"
                class="dropdown-item"
                @click="setByAllNapravs()"
              >
                По всем направлениям
              </li>
              <li v-if="napravId && viewType !== 'napravs'">
                <hr class="dropdown-divider" />
              </li>
              <li
                v-for="naprav in napravs"
                :key="naprav.id"
                class="dropdown-item"
                @click="setSelectNapravs(naprav.id)"
              >
                {{ naprav.title }}
              </li>
            </ul>
          </div>

          <div class="btn-group">
            <button
              type="button"
              class="
                my-select-btn-pj
                btn btn-sm btn-outline-light
                text-secondary
              "
              :class="{ active: viewType === 'projects' }"
              :disabled="!napravs.length"
              @click="setActiveProjects(projectId)"
            >
              {{ projectTitle }}
            </button>
            <button
              type="button"
              class="
                btn btn-sm btn-outline-light
                dropdown-toggle dropdown-toggle-split
                text-secondary
              "
              data-bs-toggle="dropdown"
              aria-expanded="false"
              id="dropdownProject"
              :disabled="!napravs.length"
            ></button>
            <ul
              class="dropdown-menu border-0 shadow"
              aria-labelledby="dropdownProject"
            >
              <li
                v-if="viewType === 'tasks'"
                class="dropdown-item"
                @click="setShowProjects()"
              >
                Отобразить проекты
              </li>
              <li v-if="viewType === 'tasks'">
                <hr class="dropdown-divider" />
              </li>
              <li
                v-if="projectId && viewType === 'tasks'"
                class="dropdown-item"
                @click="setByAllProjects()"
              >
                По всем проектам
              </li>
              <li v-if="projectId && viewType === 'tasks'">
                <hr class="dropdown-divider" />
              </li>
              <li
                v-for="project in projectsFiltered"
                :key="project.id"
                class="dropdown-item"
                :disabled="!napravs.length || !projects.length"
                @click="setSelectProjects(project.id)"
              >
                {{ project.title }}
              </li>
            </ul>
          </div>

          <button
            type="button"
            class="my-select-btn-ts btn btn-outline-light text-secondary"
            :class="{
              active: viewType === 'tasks'
            }"
            :disabled="!napravs.length || !projects.length"
            @click="setSelectTasks()"
          >
            Задачи
          </button>
        </div>

        <div v-if="viewType === 'tasks'" class="btn-group mt-2 mt-md-0 me-3">
          <span
            type="button"
            class="
              my-btn-nohover my-select-btn-pj
              btn btn-sm btn-outline-light
              text-secondary
            "
          >
            {{ filterTitle }}
          </span>
          <button
            type="button"
            class="
              btn btn-sm btn-outline-light
              dropdown-toggle dropdown-toggle-split
              text-secondary
            "
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="dropdownFilters"
          ></button>

          <button
            type="button"
            class="
              btn btn-sm btn-outline-light
              text-secondary
              p-0
              pb-1
              ps-2
              pe-2
            "
            @click="setSelectFilter('', '')"
            :disabled="!filterId"
          >
            <svg
              v-if="filterId"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-x"
              viewBox="0 0 16 16"
            >
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-funnel"
              viewBox="0 0 16 16"
            >
              <path
                d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5v-2zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2h-11z"
              />
            </svg>
          </button>

          <ul
            class="dropdown-menu border-0 shadow"
            aria-labelledby="dropdownFilters"
          >
            <!-- <li class="dropdown-item">Сбросить фильтр</li>
            <li>
              <hr class="dropdown-divider" />
            </li> -->

            <li
              v-for="filter in filters"
              :key="filter.id"
              class="my-dropdown-item dropdown-item"
              @click="setSelectFilter(filter.id, filter.name)"
            >
              <button
                class="my-btn-light btn w-100 btn-sm btn-light border"
                :class="{ 'my-dropdown-select': filter.id === filterId }"
              >
                {{ filter.title }}
              </button>
            </li>
          </ul>
        </div>

        <div class="mt-2 mt-md-0">
          <AddItem v-if="viewType === 'napravs'" :type="'napravs'" />
          <AddItem
            v-if="napravId && !projectId && viewType === 'projects'"
            :type="'projects'"
          />
          <AddItem
            v-if="projectId && viewType === 'projects'"
            :type="'lists'"
          />
          <AddItem
            v-if="napravId && projectId && viewType === 'tasks' && !filterId"
            :type="'tasks'"
            :projectId="projectId"
          />
        </div>
      </div>

      <div class="d-none d-md-flex align-items-center">
        <Loading v-if="loading" />
        <div
          v-if="viewType === 'tasks'"
          class="btn-group btn-group-sm me-3"
          role="group"
          aria-label="Basic example"
        >
          <button
            v-if="viewType === 'tasks'"
            type="button"
            class="btn btn-outline-light text-secondary p-0 pb-1 ps-2 pe-2"
            :class="{ active: viewView === 'cards' }"
            @click="setViewView('cards')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-grid"
              viewBox="0 0 16 16"
            >
              <path
                d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"
              />
            </svg>
          </button>
          <button class="btn ps-0 pe-0">&nbsp;</button>
          <button
            v-if="viewType === 'tasks'"
            type="button"
            class="btn btn-outline-light text-secondary p-0 pb-1 ps-2 pe-2"
            :class="{ active: viewView === 'checklist' }"
            @click="setViewView('checklist')"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-list-task"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"
              />
              <path
                d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z"
              />
              <path
                fill-rule="evenodd"
                d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"
              />
            </svg>
          </button>
        </div>

        <button
          class="btn btn-sm p-0 me-1 opacity-06"
          title="Настройки"
          data-bs-toggle="offcanvas"
          data-bs-target="#settingsBar"
          aria-controls="settingsBar"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-gear"
            viewBox="0 0 16 16"
          >
            <path
              d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"
            />
            <path
              d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"
            />
          </svg>
        </button>
      </div>
    </div>
    <div v-else class="container-fluid">
      <div class="d-none d-md-block navbar-brand">
        <img
          src="/img/icons/logo_8.svg"
          height="26"
          class="d-inline-block mb-1 me-1"
          alt="ATIOP"
        />
        ATIOP
      </div>
      <a
        href="https://doc.atiop.ru/"
        target="_blank"
        class="btn btn-sm btn-light text-muted"
        >О приложении</a
      >
    </div>
  </nav>
</template>

<script>
import getFilters from '@/scripts/getFilters'
import Loading from '@/components/additional/Loading'
import AddItem from '@/components/item/AddItem'

export default {
  components: {
    Loading,
    AddItem
  },
  data() {
    return {
      filters: getFilters
    }
  },
  computed: {
    filterTitle() {
      if (this.filterId) {
        return this.filters.find(item => item.id === this.filterId).title
      } else {
        return 'Все задачи'
      }
    },
    filterId() {
      return this.$store.getters.filterId
    },
    userId() {
      return this.$store.getters.userId
    },
    loading() {
      return this.$store.getters.loading
    },
    viewType() {
      return this.$store.getters.viewType
    },
    viewView() {
      return this.$store.getters.viewView
    },
    napravs() {
      return this.$store.getters.napravs
    },
    projects() {
      return this.$store.getters.projects
    },
    projectsFiltered() {
      if (this.napravId) {
        return this.projects.filter(item => item.napravId === this.napravId)
      }
      return this.projects
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
      return 'Направления'
    },
    projectTitle() {
      if (this.projectId && this.projects.length) {
        return this.projects.find(item => item.id === this.projectId).title
      }
      return 'Проекты'
    }
  },
  methods: {
    setSelectFilter(id, name) {
      if (id) {
        this.$store.commit('setFilterId', id)
        if (name) {
          this.$store.commit('setNewSettingsValue', { name, value: true })
        }
      } else {
        this.$store.commit('setFilterId', '')
      }
    },
    setActiveNapravs(id) {
      if (id) {
        this.$store.commit('setProjectId', '')
        this.$store.commit('setViewType', 'projects')
      } else {
        this.$store.commit('setNapravId', '')
        this.$store.commit('setViewType', 'napravs')
      }
    },
    setShowNapravs() {
      this.$store.commit('setNapravId', '')
      this.$store.commit('setProjectId', '')
      this.$store.commit('setViewType', 'napravs')
    },
    setByAllNapravs() {
      this.$store.commit('setNapravId', '')
      this.$store.commit('setProjectId', '')
    },
    setSelectNapravs(id) {
      this.$store.commit('setNapravId', id)
      this.$store.commit('setProjectId', '')
      if (!this.viewType || this.viewType === 'napravs') {
        this.$store.commit('setViewType', 'projects')
      }
    },

    setActiveProjects(id) {
      if (id) {
        if (this.viewType === 'tasks' || this.viewType === 'person') {
          this.$store.commit('setViewType', 'projects')
        }
      } else {
        this.$store.commit('setProjectId', '')
        this.$store.commit('setViewType', 'projects')
      }
    },
    setShowProjects() {
      this.$store.commit('setProjectId', '')
      this.$store.commit('setViewType', 'projects')
    },
    setByAllProjects() {
      this.$store.commit('setProjectId', '')
    },
    setSelectProjects(id) {
      const napravId = this.projects.find(item => item.id === id).napravId
      this.$store.commit('setNapravId', napravId)
      this.$store.commit('setProjectId', id)
      if (!this.viewType) {
        this.$store.commit('setViewType', 'projects')
      }
    },

    setSelectTasks() {
      this.$store.commit('setViewType', 'tasks')
    },

    setSelectPerson() {
      this.$store.commit('setViewType', 'person')
    },

    setViewView(view) {
      this.$store.commit('setViewView', view)
    },

    setSelectCalendar() {
      this.$store.commit('setViewType', 'calendar')
    }
  }
}
</script>

<style scoped>
.navbar-brand {
  font-weight: 600;
}

.my-select-btn-pj {
  width: 104px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.my-select-btn-ts {
  width: 64px;
}

.my-btn-light:hover {
  background-color: #e2e6ea;
}

.my-btn-nohover {
  cursor: default;
}

.my-btn-nohover:hover,
.my-dropdown-item:focus,
.my-dropdown-item:hover {
  background-color: #fff;
}

.my-dropdown-select {
  background-color: #e2e6ea;
}

.opacity-04 {
  opacity: 0.4;
}

.opacity-06 {
  opacity: 0.6;
}
</style>