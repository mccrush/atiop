<template>
  <div class="row border border-warning">
    <CoverListDirections />
    <CoverListTasks />
    <CoverCard />
  </div>
</template>

<script>
import CoverListDirections from './../modules/web/CoverListDirections.vue'
import CoverListTasks from './../modules/web/CoverListTasks.vue'
import CoverCard from './../modules/web/CoverCard.vue'

export default {
  components: {
    CoverListDirections,
    CoverListTasks,
    CoverCard
  }
}
</script>