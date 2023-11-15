<template>
  <div
    class="modal fade"
    id="staticBackdrop"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div v-if="item" class="modal-content border-0">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            {{ item.title }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <FormTask :item="item" :currentUserId="currentUserId" />
        </div>
        <!-- <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import FormTask from './../forms/FormTask.vue'

export default {
  components: {
    FormTask
  },
  props: {
    item: Object
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    }
  }
}
</script>