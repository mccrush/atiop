<template>
  <div class="row pt-3">
    <div class="d-none d-xxl-block col-2"></div>
    <CoverListDirections v-if="view === 'all'" class="col-3 col-xxl-2" />
    <CoverListTasks v-if="view === 'all'" class="col-3 col-xxl-2" />
    <CoverListLostday v-if="view === 'date'" class="col-3 col-xxl-2" />
    <CoverListToday v-if="view === 'date'" class="col-3 col-xxl-2" />
    <div v-if="view === 'coming'" class="col-3 col-xxl-2"></div>
    <CoverListComingday v-if="view === 'coming'" class="col-3 col-xxl-2" />
    <CoverCard class="col-6 col-xxl-4" />
  </div>
</template>

<script>
import CoverListDirections from './CoverListDirections.vue'
import CoverListTasks from './CoverListTasks.vue'
import CoverListLostday from './CoverListLostday.vue'
import CoverListToday from './CoverListToday.vue'
import CoverListComingday from './CoverListComingday.vue'
import CoverCard from './CoverCard.vue'

export default {
  components: {
    CoverListDirections,
    CoverListTasks,
    CoverListLostday,
    CoverListToday,
    CoverListComingday,
    CoverCard
  },
  computed: {
    view() {
      return this.$store.getters.view
    }
  }
}
</script>