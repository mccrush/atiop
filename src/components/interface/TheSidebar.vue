<template>
  <div
    class="offcanvas offcanvas-end"
    data-bs-theme="dark"
    tabindex="-1"
    id="offcanvasExample"
    aria-labelledby="offcanvasExampleLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Меню</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Закрыть"
      ></button>
    </div>
    <div class="offcanvas-body">
      <a
        href="https://doc.atiop.ru/"
        target="_blank"
        class="btn btn-dark text-secondary d-sm-none w-100 ps-2 pe-2 mt-2"
        title="Руководство"
        >Руководство ⇗</a
      >

      <BtnLogOut
        v-if="currentUserId"
        class="btn-dark w-100 ps-3 pe-3 mt-3"
        @click="logOut"
      />
    </div>
  </div>
</template>

<script>
import BtnLogOut from './../buttons/BtnLogOut.vue'

export default {
  components: {
    BtnLogOut
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    }
  },
  methods: {
    logOut() {
      this.$store.commit('setItem', { type: 'task', item: null })
      this.$store.dispatch('logOut')
    }
  }
}
</script>