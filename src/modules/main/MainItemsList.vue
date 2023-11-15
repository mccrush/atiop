<template>
  <div class="col-4">
    <FormItem :type="type" :parentId="parentId" />

    <ul class="list-group mt-2">
      <li
        v-for="item in items"
        :key="item.id"
        class="list-group-item lh-1 bg-white d-flex justify-content-between align-items-center pe-2"
        @click="setItemId(item.id)"
      >
        <div class="me-auto">
          <div class="fw-bold">{{ item.title }}</div>
        </div>
        <BtnTrash class="btn-sm" @click="removeItem(item)" />
      </li>
    </ul>
  </div>
</template>

<script>
import FormItem from './../../components/forms/FormItem.vue'
import BtnTrash from './../../components/buttons/BtnTrash.vue'

export default {
  components: {
    FormItem,
    BtnTrash
  },
  props: {
    parentId: String,
    type: String
  },
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
    }
  },
  methods: {
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