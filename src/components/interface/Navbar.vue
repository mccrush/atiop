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
            id="dropdownMenuSettings1"
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

          <SettingsDrop
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuSettings1"
          />
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
              class="my-select-btn-pj btn btn-sm btn-outline-light text-secondary"
              :class="{ active: viewType === 'napravs' }"
              @click="setActiveNapravs(napravId)"
            >
              {{ napravTitle }}
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-light dropdown-toggle dropdown-toggle-split text-secondary"
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
              class="my-select-btn-pj btn btn-sm btn-outline-light text-secondary"
              :class="{ active: viewType === 'projects' }"
              :disabled="!napravs.length"
              @click="setActiveProjects(projectId)"
            >
              {{ projectTitle }}
            </button>
            <button
              type="button"
              class="btn btn-sm btn-outline-light dropdown-toggle dropdown-toggle-split text-secondary"
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

        <div class="btn-group">
          <button
            type="button"
            class="my-select-btn-pj btn btn-sm btn-outline-light text-secondary"
            :disabled="viewType !== 'tasks'"
          >
            {{ filterTitle }}
          </button>
          <button
            type="button"
            class="btn btn-sm btn-outline-light dropdown-toggle dropdown-toggle-split text-secondary"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            id="dropdownFilters"
          ></button>
          <ul
            class="dropdown-menu border-0 shadow"
            aria-labelledby="dropdownFilters"
          >
            <li class="dropdown-item">Сбросить фильтр</li>
            <li>
              <hr class="dropdown-divider" />
            </li>

            <li
              v-for="filter in filters"
              :key="filter.id"
              class="my-dropdown-item dropdown-item"
              @click="setSelectFilter(filter.id)"
            >
              <button class="my-btn-light btn w-100 btn-sm btn-light border">
                {{ filter.title }}
              </button>
            </li>
          </ul>
        </div>

        <!-- <div class="dropdown">
          <button
            class="btn btn-sm btn-outline-light text-secondary dropdown-toggle me-3"
            type="button"
            id="dropdownFilter"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            :disabled="true"
          >
            Все
          </button>
          <ul
            class="dropdown-menu bg-white border-0 shadow p-3 pt-2"
            aria-labelledby="dropdownFilter"
          >
            <li><a class="dropdown-item" href="#">Action</a></li>
            <li><a class="dropdown-item" href="#">Another action</a></li>
            <li><a class="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </div> -->
        <div>
          <AddItem v-if="viewType === 'napravs'" :type="'napravs'" />
        </div>
        <div>
          <AddItem
            v-if="napravId && !projectId && viewType === 'projects'"
            :type="'projects'"
          />
        </div>
        <div>
          <AddItem
            v-if="projectId && viewType === 'projects'"
            :type="'lists'"
          />
        </div>
        <div>
          <AddItem
            v-if="napravId && projectId && viewType === 'tasks'"
            :type="'tasks'"
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
            <img
              src="/img/icons_tool/grid.svg"
              width="16"
              height="16"
              alt="Cards"
              class="opacity-04"
            />
          </button>
          <button
            v-if="viewType === 'tasks'"
            type="button"
            class="btn btn-outline-light text-secondary p-0 pb-1 ps-2 pe-2"
            :class="{ active: viewView === 'checklist' }"
            @click="setViewView('checklist')"
          >
            <img
              src="/img/icons_tool/list-check.svg"
              width="16"
              height="16"
              alt="Checklist"
              class="opacity-04"
            />
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

          <SettingsDrop
            class="dropdown-menu dropdown-menu-end"
            aria-labelledby="dropdownMenuSettings"
          />
        </div>
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
        href="https://github.com/mccrush/atiop/wiki"
        target="_blank"
        class="btn btn-sm btn-light text-muted"
        >О приложении</a
      >
    </div>
  </nav>
</template>

<script>
import { Dropdown } from 'bootstrap' // Без него не работает Dropdown
import SettingsDrop from '@/components/additional/SettingsDrop'
import Loading from '@/components/additional/Loading'
import AddItem from '@/components/item/AddItem'

export default {
  components: {
    SettingsDrop,
    Loading,
    AddItem
  },
  computed: {
    filterTitle() {
      return 'Все задачи'
    },
    filters() {
      return [
        { id: '01', title: 'С ценой' },
        { id: '02', title: 'С Датой' },
        { id: '03', title: 'Со временм' }
      ]
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
    setSelectFilter() {},
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
        if (this.viewType === 'tasks') {
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

.my-dropdown-item:focus,
.my-dropdown-item:hover {
  background-color: #fff !important;
}

.opacity-04 {
  opacity: 0.4;
}

.opacity-06 {
  opacity: 0.6;
}
</style>