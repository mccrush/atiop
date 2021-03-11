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
        <Loading2 v-if="loading2" />
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
              class="btn btn-sm btn-outline-light text-secondary"
              :class="{ active: viewType === 'napravs' }"
              @click="setId(napravId, 'napravs')"
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
                v-if="napravId"
                class="dropdown-item"
                @click="setViewType('napravs')"
              >
                Показать все
              </li>
              <li v-if="napravId"><hr class="dropdown-divider" /></li>
              <li
                v-for="naprav in napravs"
                :key="naprav.id"
                class="dropdown-item"
                @click="setId(naprav.id, 'napravs')"
              >
                {{ naprav.title }}
              </li>
            </ul>
          </div>

          <div class="btn-group">
            <button
              type="button"
              class="btn btn-sm btn-outline-light text-secondary"
              :class="{ active: viewType === 'projects' }"
              :disabled="!napravs.length"
              @click="setId(projectId, 'projects')"
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
                v-if="projectId"
                class="dropdown-item"
                @click="setViewType('projects')"
              >
                Показать все
              </li>
              <li v-if="projectId"><hr class="dropdown-divider" /></li>
              <li
                v-for="project in projectsFiltered"
                :key="project.id"
                class="dropdown-item"
                :disabled="!napravs.length || !projects.length"
                @click="setId(project.id, 'projects')"
              >
                {{ project.title }}
              </li>
            </ul>
          </div>

          <button
            type="button"
            class="btn btn-outline-light text-secondary"
            :class="{
              active: viewType === 'tasks'
            }"
            :disabled="!napravs.length || !projects.length"
            @click="setViewType('tasks')"
          >
            Задачи
          </button>
        </div>

        <div class="dropdown">
          <button
            class="btn btn-sm btn-outline-light text-secondary dropdown-toggle me-3"
            type="button"
            id="dropdownFilter"
            data-bs-toggle="dropdown"
            aria-expanded="false"
            :disabled="!napravs.length"
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
        <div class="ms-2 small">
          All:
          <span class="badge bg-info text-white"> {{ allItemsLength }}</span>
        </div>
        <div class="ms-2 small">
          AllShow:
          <span class="badge bg-light text-muted">
            {{ allItemsShowLength }}</span
          >
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
      <a href="#about" class="btn btn-sm btn-light text-muted">О приложении</a>
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
    userId() {
      return this.$store.getters.userId
    },
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
    },
    allItemsLength() {
      return this.$store.getters.allItemsLength
    },
    allItemsShowLength() {
      return this.$store.getters.allItemsShowLength
    }
  },
  methods: {
    setViewType(type) {
      if (type === 'napravs') {
        this.$store.commit('setId', { id: '', typeId: 'napravId' })
        this.$store.commit('setId', { id: '', typeId: 'projectId' })
        this.$store.commit('setViewView', 'kanban')
      }
      if (type === 'projects') {
        this.$store.commit('setId', { id: '', typeId: 'projectId' })
        this.$store.commit('setViewView', 'kanban')
      }
      if (type === 'tasks') {
        this.$store.commit('setViewView', 'cards')
      }
      this.$store.commit('setViewType', type)
    },
    setViewView(view) {
      this.$store.commit('setViewView', view)
    },
    setId(id, type) {
      if (type === 'napravs') {
        if (id) {
          this.$store.commit('setId', { id, typeId: 'napravId' })
          this.$store.commit('setViewType', 'projects')
        } else {
          this.$store.commit('setId', { id: '', typeId: 'napravId' })
          this.$store.commit('setViewType', 'napravs')
        }
        this.$store.commit('setId', { id: '', typeId: 'projectId' })
      } else if (type === 'projects') {
        let napravId = ''
        if (id && !this.napravId) {
          napravId = this.projects.find(item => item.id === id).napravId
        }
        this.$store.commit('setId', {
          id: this.napravId || napravId,
          typeId: 'napravId'
        })
        this.$store.commit('setId', { id, typeId: 'projectId' })
        this.$store.commit('setViewType', 'projects')
      }
      this.$store.commit('setViewView', 'kanban')
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