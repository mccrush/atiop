<template>
  <div class="calendar row bg-warning">
    <div
      class="
        select-pole
        col-12
        bg-white
        d-flex
        justify-content-between
        pt-2
        pb-3
      "
    >
      <SelectYear />
      <SelectMonth />
    </div>
    <div class="col-12">Dates</div>
  </div>
</template>

<script>
import SelectYear from '@/components/calendar/SelectYear'
import SelectMonth from '@/components/calendar/SelectMonth'

export default {
  components: {
    SelectYear,
    SelectMonth
  }
}
</script>


<style scoped>
.calendar {
  height: calc(100vh - 59px);
}

.select-pole {
  height: 56px;
}
</style>

