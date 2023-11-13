<template>
  <div class="d-flex align-items-start">
    <div
      v-for="elem in getChildArray(type, parentId)"
      :key="elem.id"
      class="border border-success rounded me-2 p-2"
    >
      <div class="mb-2">
        {{ type.substring(0, type.length - 1) }} title
        <ButtonRemove
          :type="elem.type"
          :id="elem.id"
          @remove-elem="removeElem"
        />
      </div>
      <CycleView v-if="type !== 'tasks'" :type="nextType" :parentId="elem.id" />
    </div>
    <ButtonAdd :type="type" :parentId="parentId" @add-elem="addElem" />
  </div>
</template>

<script>
import CycleView from './CycleView.vue'
import ButtonRemove from './ButtonRemove.vue'
import ButtonAdd from './ButtonAdd.vue'

export default {
  components: {
    CycleView,
    ButtonRemove,
    ButtonAdd
  },
  props: ['type', 'parentId'],
  data() {
    return {
      types: ['napravs', 'projects', 'lists', 'tasks'],
      napravs: JSON.parse(localStorage.getItem('napravs')) || [],
      projects: JSON.parse(localStorage.getItem('projects')) || [],
      lists: JSON.parse(localStorage.getItem('lists')) || [],
      tasks: JSON.parse(localStorage.getItem('tasks')) || []
    }
  },
  computed: {
    nextType() {
      if (this.type === 'napravs') {
        return 'projects'
      } else if (this.type === 'projects') {
        return 'lists'
      } else if (this.type === 'lists') {
        return 'tasks'
      }
    }
  },
  methods: {
    getChildArray(type, parentId = '') {
      if (parentId) {
        return this[type].filter(item => item.parentId === parentId)
      } else {
        return this[type]
      }
    },
    addElem({ type, parentId }) {
      this[type].push(this.getNewElem(type, parentId))
      localStorage.setItem(type, JSON.stringify(this[type]))
    },
    removeElem({ type, id }) {
      this[type] = this[type].filter(item => item.id !== id)
      localStorage.setItem(type, JSON.stringify(this[type]))
    },
    getNewElem(type, parentId = '') {
      return {
        type,
        id: Date.now().toString(),
        parentId
      }
    }
  }
}
</script>

<style scoped>
.btn-sm {
  padding: 2px 4px !important;
}
</style>