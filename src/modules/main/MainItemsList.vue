<template>
  <div class="col-4">
    <FormAddItem :type="type" :parentId="parentId" />

    <ul class="list-group mt-2">
      <li
        v-for="item in items"
        :key="item.id"
        class="cursor-default list-group-item lh-1 d-flex justify-content-between align-items-center pe-2"
        :class="{ active: item.id === currentItemId }"
        @click="setItemId(item.id)"
        @dblclick="editItem(item)"
      >
        <div class="me-auto">
          <div class="">{{ item.title }}</div>
        </div>
        <div
          class="info-block d-flex justify-content-between align-items-center"
        >
          <span v-if="item.price" class="badge text-bg-success me-1">{{
            item.price
          }}</span>
          <span class="badge text-bg-light">{{
            getChildrenItemsLength(item.id)
          }}</span>
          <!-- <div class="hide-buttons">
            <BtnTrash class="btn-sm" @click="removeItem(item)" />
            <BtnEdit
              class="btn-sm ms-1"
              @click="editItem(item)"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            />
          </div> -->
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import FormAddItem from './../../components/forms/FormAddItem.vue'
import BtnTrash from './../../components/buttons/BtnTrash.vue'
import BtnEdit from './../../components/buttons/BtnEdit.vue'

export default {
  components: {
    FormAddItem,
    BtnTrash,
    BtnEdit
  },
  props: {
    parentId: String,
    type: String
  },
  emits: ['edit-item'],
  computed: {
    items() {
      if (this.type === 'project' || this.type === 'task') {
        return this.$store.getters[this.type].filter(
          item => item.parentId === this.parentId
        )
      } else {
        return this.$store.getters[this.type]
      }
    },
    currentUserId() {
      return this.$store.getters.currentUserId
    },
    currentItemId() {
      switch (this.type) {
        case 'direction':
          return this.$store.getters.directionId
        case 'project':
          return this.$store.getters.projectId
        case 'task':
          return this.$store.getters.taskId
      }
    }
  },
  methods: {
    getChildrenItemsLength(parentId) {
      if (this.type === 'direction') {
        const childrenItemsLength = this.$store.getters.childrenItemsLength(
          'project',
          parentId
        )

        const childrenItems = this.$store.getters.childrenItems(
          'project',
          parentId
        )

        let grandChildLenth = 0
        childrenItems.forEach(item => {
          grandChildLenth += this.$store.getters.childrenItemsLength(
            'task',
            item.id
          )
        })
        return childrenItemsLength + '/' + grandChildLenth
      }
      if (this.type === 'project') {
        return this.$store.getters.childrenItemsLength('task', parentId)
      }
    },
    editItem(item) {
      this.$emit('edit-item', { item })
    },
    setItemId(id) {
      if (this.type === 'direction') {
        this.$store.commit('setItemId', { type: 'project', item: '' })
      }
      this.$store.commit('setItemId', { type: this.type, item: id })
    },

    removeOneItem(item) {
      this.$store.dispatch('removeItemRT', {
        item,
        currentUserId: this.currentUserId
      })
    },

    removeItem(item) {
      if (item.type === 'direction') {
        if (confirm('Будут удалены все дочерние Проекты и Задачи')) {
          const childrenTasks = this.$store.getters.project.filter(
            el => el.parentId === item.id
          )
          childrenTasks.forEach(el => {
            this.removeItem(el)
          })
          this.removeOneItem(item)
        }
      } else if (item.type === 'project') {
        if (confirm('Будут удалены все дочерние Задачи')) {
          const childrenTasks = this.$store.getters.task.filter(
            el => el.parentId === item.id
          )
          childrenTasks.forEach(el => {
            this.removeItem(el)
          })
          this.removeOneItem(item)
        }
      } else {
        this.removeOneItem(item)
      }
    }
  }
}
</script>

<style scoped>
/* .hide-buttons {
  visibility: hidden;
  opacity: 0;
  transition: 0.3s ease-in-out;
}

.list-group-item:hover > .info-block > .hide-buttons {
  visibility: visible;
  opacity: 1;
} */
</style>