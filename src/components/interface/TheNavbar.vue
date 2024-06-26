<template>
  <nav class="navbar navbar-expand-md border-bottom border-black">
    <div class="container-fluid pt-1 pb-1">
      <div class="col-1">
        <div class="d-md-none navbar-brand p-0">
          <img
            src="/img/icons/logo_8.svg"
            height="26"
            class="d-inline-block mb-1 me-0"
            alt="ATIOP"
            :class="{ rotate: loadingRT }"
          />
        </div>
        <div class="d-none d-md-block navbar-brand text-body-secondary p-0">
          <img
            src="/img/icons/logo_8.svg"
            height="26"
            class="d-inline-block mb-1 me-2"
            alt="ATIOP"
            :class="{ rotate: loadingRT }"
          />
          ATIOP
        </div>
      </div>

      <div class="col-4 col-sm-2 col-md-1 ps-1 pe-1">
        <div
          v-if="currentUserId"
          class="btn-group w-100"
          role="group"
          aria-label="Select appMode"
        >
          <BtnNavTasks
            :class="{ active: appMode === 'tasks' }"
            title="Задачи"
            @click="setAppMode('tasks')"
          />
          <BtnNavNotes
            :class="{ active: appMode === 'notes' }"
            title="Заметки"
            @click="setAppMode('notes')"
          />
        </div>
      </div>

      <div class="col-4 col-sm-2 col-md-1 ps-1 pe-1">
        <div
          v-if="currentUserId"
          class="btn-group w-100"
          role="group"
          aria-label="Select appMode"
        >
          <BtnNavList
            :class="{ active: mainView === 'list' }"
            title="Списки"
            @click="setMainView('list')"
          />
          <BtnNavKanban
            :class="{ active: mainView === 'kanban' }"
            title="Канбан"
            @click="setMainView('kanban')"
          />
        </div>
      </div>

      <div class="col-2 d-sm-none ps-1 pe-1">
        <button
          class="btn btn-dark text-body-secondary lh-1 w-100 ps-3 pe-3"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasMenu"
          aria-controls="offcanvasMenu"
        >
          =
        </button>
      </div>

      <div class="col-12 col-sm-4 col-lg-2 ps-1 pe-1">
        <div
          v-if="currentUserId && appMode === 'tasks' && mainView === 'list'"
          class="btn-group w-100 mt-2 mt-sm-0"
          role="group"
          aria-label="Select view"
        >
          <BtnSelectView
            :class="{ active: view === 'all' }"
            title="Все"
            @click="setView('all')"
          />
          <BtnSelectView
            :class="{ active: view === 'date' }"
            title="Сегодня"
            @click="setView('date')"
          />
          <BtnSelectView
            :class="{ active: view === 'coming' }"
            title="Скоро"
            @click="setView('coming')"
          />
        </div>
      </div>
      <div class="d-none d-md-block col-md-1 col-lg-4"></div>

      <div class="d-none d-sm-flex col-sm-3 justify-content-end ps-1 pe-1">
        <a
          href="https://doc.atiop.ru/"
          target="_blank"
          class="btn btn-sm btn-dark text-body-secondary lh-1 d-none d-sm-block ps-2 pe-2 me-2 pt-2 pb-2"
          title="Документация"
          >Док ⇗</a
        >

        <div class="dropdown">
          <BtnUser
            v-if="currentUserId"
            class="d-none d-sm-block"
            :title="currentUserEmail"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          />
          <div class="dropdown-menu dropdown-menu-end border-0 p-3">
            <span class="d-none d-sm-block text-body-secondary small me-2">{{
              currentUserEmail
            }}</span>

            <BtnLogOut
              v-if="currentUserId"
              class="btn-sm d-none d-sm-block w-100 mt-2 ps-3 pe-3"
              @click="logOut"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </nav>
</template>

<script>
//import { dataModels } from './../../data/dataModels'
import BtnNavTasks from './../buttons/BtnNavTasks.vue'
import BtnNavNotes from './../buttons/BtnNavNotes.vue'
import BtnNavList from './../buttons/BtnNavList.vue'
import BtnNavKanban from './../buttons/BtnNavKanban.vue'
import BtnSelectView from './../buttons/BtnSelectView.vue'
import BtnLogOut from './../buttons/BtnLogOut.vue'
import BtnUser from './../buttons/BtnUser.vue'

export default {
  components: {
    BtnNavTasks,
    BtnNavNotes,
    BtnNavList,
    BtnSelectView,
    BtnNavKanban,
    BtnLogOut,
    BtnUser
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    },
    currentUserEmail() {
      return this.$store.getters.currentUserEmail
    },
    appMode() {
      return this.$store.getters.appMode
    },
    view() {
      return this.$store.getters.view
    },
    mainView() {
      return this.$store.getters.mainView
    },
    loadingRT() {
      return this.$store.getters.loadingRT
    }
  },
  methods: {
    setMainView(mainView) {
      this.$store.commit('setMainView', mainView)
    },
    setView(view) {
      this.$store.commit('setView', view)
      this.$store.commit('setItemId', { type: 'task', id: '' })
      this.$store.commit('setItem', { type: 'task', item: null })
    },
    setAppMode(appMode) {
      this.$store.commit('setAppMode', appMode)
      this.$store.commit('setView', 'all')
      this.$store.commit('setTag', null)
      this.$store.commit('setItemId', { type: 'direction', id: '' })
      this.$store.commit('setItemId', { type: 'project', id: '' })
      this.$store.commit('setItemId', { type: 'task', id: '' })
      this.$store.commit('setItem', { type: 'task', item: null })
      this.$store.dispatch('getAllItemsRT', {
        currentUserId: this.currentUserId,
        appMode
      })
    },
    logOut() {
      this.$store.commit('setItem', { type: 'task', item: null })
      this.$store.dispatch('logOut')
    }
  }
}
</script>

<style scoped>
.rotate {
  animation: rotation 1s infinite linear;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>