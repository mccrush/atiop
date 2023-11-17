<template>
  <div>
    <MainNavigator />
    <div class="row">
      <MainItemsList
        v-if="!directionId && !projectId"
        type="direction"
        @edit-item="editItem"
      />
      <MainItemsList
        v-if="directionId && !projectId"
        :parentId="directionId"
        type="project"
        class="ps-sm-0"
        @edit-item="editItem"
      />
      <MainItemsList
        v-if="projectId"
        :parentId="projectId"
        type="task"
        class="ps-sm-0"
        @edit-item="editItem"
      />
    </div>

    <ModalMain id="staticBackdrop" :item="modalItem" />
  </div>
</template>

<script>
import Modal from 'bootstrap/js/dist/modal'
import MainNavigator from './../modules/main/MainNavigator.vue'
import MainItemsList from './../modules/main/MainItemsList.vue'
import ModalMain from './../components/modal/ModalMain.vue'

export default {
  components: {
    MainNavigator,
    MainItemsList,
    ModalMain
  },
  data() {
    return {
      modalItem: null
    }
  },
  computed: {
    directionId() {
      return this.$store.getters.directionId
    },
    projectId() {
      return this.$store.getters.projectId
    }
  },
  methods: {
    editItem({ item }) {
      this.modalItem = item
      const staticBackdrop = new Modal(
        document.getElementById('staticBackdrop')
      )
      staticBackdrop.show()
    }
  }
}
</script>