<template>
  <div class="row">
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
import CoverListDirections from './../modules/web/CoverListDirections.vue'
import CoverListTasks from './../modules/web/CoverListTasks.vue'
import CoverListLostday from './../modules/web/CoverListLostday.vue'
import CoverListToday from './../modules/web/CoverListToday.vue'
import CoverListComingday from './../modules/web/CoverListComingday.vue'
import CoverCard from './../modules/web/CoverCard.vue'

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