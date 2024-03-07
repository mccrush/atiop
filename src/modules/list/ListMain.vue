<template>
  <div class="row">
    <div class="d-none d-xxl-block col-2"></div>
    <CoverListDirections v-if="view === 'all'" />
    <CoverListTasks v-if="view === 'all'" />
    <CoverListLostday v-if="view === 'date'" />
    <CoverListToday v-if="view === 'date'" />
    <div v-if="view === 'coming'" class="col-3 col-xxl-2"></div>
    <CoverListComingday v-if="view === 'coming'" />
    <CoverCard />
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