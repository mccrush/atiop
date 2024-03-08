<template>
  <div class="col-md-4 col-lg-3 col-xxl-2 rounded p-2 ms-1">
    <h6
      class="cursor-pointer m-0"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasForm"
      aria-controls="offcanvasForm"
      @click="setItemId(project)"
    >
      {{ project.title }}
    </h6>
    <div class="d-flex justify-content-end border-bottom pb-2">
      <span class="badge fw-normal text-bg-dark">{{ tasks.length }}</span>
      <span
        v-if="taskMoneySum"
        class="badge bg-dark fw-normal text-success ms-1"
        >{{ taskMoneySum }}</span
      >
      <span
        v-if="taskMoneyTime"
        class="badge bg-dark fw-normal text-secondary ms-1"
        >{{ taskMoneyTime }}</span
      >
    </div>
    <div class="at-height-100 overflow-y-auto">
      <KanbanCard
        v-for="task in itemsSort"
        :key="task"
        :item="task"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasForm"
        aria-controls="offcanvasForm"
        @click="setItemId(task)"
      />
      <div class="pt-2">
        <BtnAddLight v-show="!createItem" @click="showAddForm" />
        <FormAddItem
          v-show="createItem"
          type="task"
          ref="addForm"
          :parentId="project.id"
          @set-item-id="setItemId"
          @hide-add-form="createItem = false"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { sortMethod } from './../../helpers/sortMethod'
import KanbanCard from './KanbanCard.vue'
import BtnAddLight from './../../components/buttons/BtnAddLight.vue'
import FormAddItem from './../../components/forms/FormAddItem.vue'

export default {
  components: {
    KanbanCard,
    BtnAddLight,
    FormAddItem
  },
  props: {
    project: Object
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
    tasks() {
      if (this.project) {
        return this.$store.getters.task.filter(
          item => item.parentId === this.project.id
        )
      }
      return []
    },
    itemsSort() {
      return sortMethod(this.tasks, 'asc', 'position')
    },
    taskMoneySum() {
      return this.tasks.reduce((sum, item) => sum + item.price, 0)
    },
    taskMoneyTime() {
      return this.tasks.reduce((sum, item) => sum + item.minutes, 0)
    }
  },
  methods: {
    setItemId(item) {
      if (item.type === 'project') {
        this.$store.commit('setItemId', { type: 'task', id: '' })
      }
      if (item.type === 'task') {
        this.$store.commit('setItemId', { type: 'project', id: item.parentId })
      }
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
  height: calc(100svh - 164px);
}
</style>