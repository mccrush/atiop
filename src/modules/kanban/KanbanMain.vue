<template>
  <div class="row">
    <KanbanListDirections />
    <div
      class="at-height-100 col-10 col-lg-11 d-flex overflow-x-auto ps-0 pt-2"
    >
      <KanbanList
        v-for="project in projects"
        :key="project.id"
        :project="project"
      />
      <div v-if="directionId" class="col-3 col-lg-2 p-2 ms-2">
        <BtnAddLight v-show="!createItem" @click="showAddForm" />
        <FormAddItem
          v-show="createItem"
          type="project"
          ref="addForm"
          :parentId="directionId"
          @set-item-id="setItemId"
          @hide-add-form="createItem = false"
        />
      </div>
    </div>
    <KanbanSidebar />
  </div>
</template>

<script>
import KanbanListDirections from './KanbanListDirections.vue'
import KanbanList from './KanbanList.vue'
import BtnAddLight from './../../components/buttons/BtnAddLight.vue'
import FormAddItem from './../../components/forms/FormAddItem.vue'
import KanbanSidebar from './KanbanSidebar.vue'

export default {
  components: {
    KanbanListDirections,
    KanbanList,
    BtnAddLight,
    FormAddItem,
    KanbanSidebar
  },
  data() {
    return {
      createItem: false
    }
  },
  computed: {
    directionId() {
      return this.$store.getters.directionId
    },
    projects() {
      if (this.directionId) {
        return this.$store.getters.project.filter(
          item => item.parentId === this.directionId
        )
      }
      return []
    }
  },
  methods: {
    setItemId(item) {
      this.$store.commit('setItemId', { type: 'task', id: '' })
      this.$store.commit('setItemId', { type: item.type, id: item.id })
      this.$store.commit('setItem', { type: item.type, item })
    },
    showAddForm() {
      this.createItem = true
      this.$refs.addForm.setFocus()
    }
  }
}
</script>

<style scoped>
.at-height-100 {
  height: calc(100svh - 89px);
}
</style>