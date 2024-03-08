<template>
  <div
    class="offcanvas offcanvas-end border-0 w-50"
    data-bs-theme="dark"
    tabindex="-1"
    id="offcanvasForm"
    aria-labelledby="offcanvasFormLabel"
  >
    <!-- <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasFormLabel">Form</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Закрыть"
      ></button>
    </div> -->
    <div class="offcanvas-body overflow-hidden p-0 pt-3 pb-2">
      <FormTask v-if="item" :item="item" />
    </div>
  </div>
</template>

<script>
import FormTask from './../../components/forms/FormTask.vue'

export default {
  components: {
    FormTask
  },
  computed: {
    item() {
      return this.$store.getters.item
    }
  }
}
</script>