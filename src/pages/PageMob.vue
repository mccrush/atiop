<template>
  <div class="row pt-3">
    <div
      v-if="view === 'all'"
      class="col-12 d-flex justify-content-between mb-3"
    >
      <BtnNavigation
        class="w-50"
        title="Направления"
        :disabled="!projectId"
        @click="resetItemId('direction')"
      />
      <div class="text-body-secondary ps-2 pt-1 pe-2">⨠</div>
      <BtnNavigation
        class="w-50"
        title="Проект"
        :disabled="!taskId"
        @click="resetItemId('project')"
      />
    </div>

    <CoverListDirections
      v-if="view === 'all' && !projectId && !taskId"
      class="col-12"
    />

    <CoverListTasks
      v-if="view === 'all' && projectId && !taskId"
      class="col-12"
    />

    <CoverListLostday v-if="view === 'date'" class="col-12" />
    <CoverListToday v-if="view === 'date'" class="col-12" />
    <CoverListComingday v-if="view === 'coming'" class="col-12" />
    <CoverCardMobile v-if="taskId" class="col-12" />
  </div>
</template>

<script>
import BtnNavigation from './../components/buttons/BtnNavigation.vue'
import CoverListDirections from './../modules/list/CoverListDirections.vue'
import CoverListTasks from './../modules/list/CoverListTasks.vue'
import CoverListLostday from './../modules/list/CoverListLostday.vue'
import CoverListToday from './../modules/list/CoverListToday.vue'
import CoverListComingday from './../modules/list/CoverListComingday.vue'
import CoverCardMobile from './../modules/list/CoverCardMobile.vue'

export default {
  components: {
    BtnNavigation,
    CoverListDirections,
    CoverListTasks,
    CoverListLostday,
    CoverListToday,
    CoverListComingday,
    CoverCardMobile
  },
  computed: {
    projectId() {
      return this.$store.getters.projectId
    },
    taskId() {
      return this.$store.getters.taskId
    },
    view() {
      return this.$store.getters.view
    }
  },
  methods: {
    resetItemId(type) {
      if (type === 'direction') {
        this.$store.commit('setItemId', { type: 'project', id: '' })
        this.$store.commit('setItemId', { type: 'task', id: '' })
      }
      if (type === 'project') {
        this.$store.commit('setItemId', { type: 'task', id: '' })
      }
    }
  }
}
</script>