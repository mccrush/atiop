<template>
  <div class="row">
    <ListPlan />
  </div>
</template>

<script>
import ListPlan from '@/components/plans/ListPlan'

export default {
  components: {
    ListPlan
  },
  data() {
    return {
      monthNumber: null
    }
  },
  mounted() {
    this.monthNumber = new Date().getMonth()
    //console.log(typeof this.monthNumber)
  }
}
</script>