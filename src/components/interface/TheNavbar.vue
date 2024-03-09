<template>
  <nav class="navbar navbar-expand-md border-bottom">
    <div class="container-fluid pt-1">
      <div class="d-sm-none navbar-brand p-0">
        <img
          src="/img/icons/logo_8.svg"
          height="26"
          class="d-inline-block mb-1 me-0"
          alt="ATIOP"
          :class="{ rotate: loadingRT }"
        />
      </div>
      <div class="d-none d-sm-block navbar-brand p-0">
        <img
          src="/img/icons/logo_8.svg"
          height="26"
          class="d-inline-block mb-1 me-2"
          alt="ATIOP"
          :class="{ rotate: loadingRT }"
        />
        ATIOP
      </div>

      <!-- <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button> -->

      <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent"> -->
      <div
        v-if="currentUserId"
        class="btn-group"
        role="group"
        aria-label="Select appMode"
      >
        <BtnNavTasks
          class="btn-sm ps-3 pe-3"
          :class="{ active: appMode === 'tasks' }"
          title="Задачи"
          @click="setAppMode('tasks')"
        />
        <BtnNavNotes
          class="btn-sm ps-3 pe-3"
          :class="{ active: appMode === 'notes' }"
          title="Заметки"
          @click="setAppMode('notes')"
        />
      </div>

      <div
        v-if="currentUserId"
        class="btn-group ms-2"
        role="group"
        aria-label="Select appMode"
      >
        <BtnNavList
          class="btn-sm ps-3 pe-3"
          :class="{ active: mainView === 'list' }"
          title="Списки"
          @click="setMainView('list')"
        />
        <BtnNavKanban
          class="btn-sm ps-3 pe-3"
          :class="{ active: mainView === 'kanban' }"
          title="Канбан"
          @click="setMainView('kanban')"
        />
      </div>

      <div
        v-if="currentUserId && appMode === 'tasks' && mainView === 'list'"
        class="btn-group ms-2"
        role="group"
        aria-label="Select view"
      >
        <BtnSelectView
          class="btn-sm ps-3 pe-3"
          :class="{ active: view === 'all' }"
          title="Все"
          @click="setView('all')"
        />
        <BtnSelectView
          class="btn-sm ps-3 pe-3"
          :class="{ active: view === 'date' }"
          title="Сегодня"
          @click="setView('date')"
        />
        <BtnSelectView
          class="btn-sm ps-3 pe-3"
          :class="{ active: view === 'coming' }"
          title="Скоро"
          @click="setView('coming')"
        />
      </div>
      <div class="me-auto"></div>

      <a
        href="https://doc.atiop.ru/"
        target="_blank"
        class="btn btn-sm btn-dark text-secondary d-none d-sm-block ps-2 pe-2 me-2"
        title="Руководство"
        >Руководство ⇗</a
      >

      <div class="dropdown">
        <BtnUser
          v-if="currentUserId"
          class="btn-sm d-none d-sm-block"
          :title="currentUserEmail"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        />
        <div class="dropdown-menu dropdown-menu-end border-0 p-3">
          <span class="d-none d-sm-block text-secondary small me-2">{{
            currentUserEmail
          }}</span>

          <BtnLogOut
            v-if="currentUserId"
            class="btn-sm d-none d-sm-block w-100 mt-2 ps-3 pe-3"
            @click="logOut"
          />
        </div>
      </div>

      <button
        class="d-sm-none btn btn-sm btn-dark p-1 ps-3 pe-3"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasMenu"
        aria-controls="offcanvasMenu"
      >
        =
      </button>
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
    BtnNavKanban,
    BtnSelectView,
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