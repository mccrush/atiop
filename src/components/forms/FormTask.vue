<template>
  <div>
    <input
      type="text"
      class="form-control bg-white"
      name="itemTitle"
      v-model.trim="item.title"
      @blur="saveItem"
    />
    <textarea
      class="form-control bg-white mt-3"
      rows="6"
      name="itemDescription"
      v-model="item.description"
      @blur="saveItem"
    ></textarea>
    <div class="row">
      <div class="col-6 col-md-3 pe-0">
        <input
          type="number"
          class="form-control bg-white mt-3"
          name="itemPosition"
          v-model.number="item.position"
          @blur="saveItem"
        />
      </div>
      <div class="col-6 col-md-3 pe-md-0">
        <input
          type="number"
          class="form-control bg-white mt-3"
          name="itemPrice"
          min="0"
          step="10"
          v-model.number="item.price"
          @blur="saveItem"
        />
      </div>
      <div class="col-12 col-md-6">
        <input
          type="datetime-local"
          class="form-control mt-3"
          name="itemDateremind"
          v-model="item.dateReminde"
          @blur="saveItem"
        />
      </div>
    </div>

    <div class="d-flex justify-content-end mt-3">
      <BtnTrash class="btn-sm" @click="removeItem(item)" />
    </div>
  </div>
</template>

<script>
import BtnTrash from './../buttons/BtnTrash.vue'

export default {
  components: {
    BtnTrash
  },
  props: {
    item: Object
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    }
  },
  methods: {
    saveItem() {
      this.$store.dispatch('updateItemRT', {
        item: this.item,
        currentUserId: this.currentUserId
      })
    },

    removeOneItem(item) {
      this.$store.dispatch('removeItemRT', {
        item,
        currentUserId: this.currentUserId
      })

      this.$store.commit('setItem', { type: this.item.type, item: null })
      this.$store.commit('setItemId', { type: this.item.type, id: '' })
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