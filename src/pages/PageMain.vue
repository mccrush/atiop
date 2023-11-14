<template>
  <div>
    <div class="row">
      <MainItemsList type="direction" class="pe-0" />
      <MainItemsList type="project" class="pe-0" />
      <MainItemsList type="task" />
    </div>
  </div>
</template>

<script>
import MainItemsList from './../modules/main/MainItemsList.vue'
export default {
  components: {
    MainItemsList
  }
}
</script>