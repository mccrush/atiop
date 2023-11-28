<template>
  <div class="row">
    <div class="col-1"></div>
    <CoverListDirections v-if="view === 'all'" />
    <CoverListTasks v-if="view === 'all'" />
    <CoverListLostday v-if="view === 'date'" />
    <CoverListToday v-if="view === 'date'" />
    <CoverCard />
  </div>
</template>

<script>
import CoverListDirections from './../modules/web/CoverListDirections.vue'
import CoverListTasks from './../modules/web/CoverListTasks.vue'
import CoverListLostday from './../modules/web/CoverListLostday.vue'
import CoverListToday from './../modules/web/CoverListToday.vue'
import CoverCard from './../modules/web/CoverCard.vue'

export default {
  components: {
    CoverListDirections,
    CoverListTasks,
    CoverListLostday,
    CoverListToday,
    CoverCard
  },
  computed: {
    view() {
      return this.$store.getters.view
    }
  }
}
</script>