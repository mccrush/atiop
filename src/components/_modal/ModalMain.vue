<template>
  <div
    class="modal fade"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div v-if="item" class="modal-content border-0">
        <!-- <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            {{ item.title }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div> -->
        <div class="modal-body">
          <FormTask :item="item" :currentUserId="currentUserId" />
          <hr />
          <div class="d-flex justify-content-end">
            <BtnTrash
              class="btn-sm"
              data-bs-dismiss="modal"
              @click="removeItem(item)"
            />
            <BtnClose class="btn-sm ms-2" data-bs-dismiss="modal" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FormTask from './../forms/FormTask.vue'
import BtnTrash from './../buttons/BtnTrash.vue'
import BtnClose from './../buttons/BtnClose.vue'

export default {
  components: {
    FormTask,
    BtnTrash,
    BtnClose
  },
  props: {
    item: Object
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    },
    appMode() {
      return this.$store.getters.appMode
    }
  },
  methods: {
    removeOneItem(item) {
      this.$store.dispatch('removeItemRT', {
        item,
        currentUserId: this.currentUserId,
        appMode: this.appMode
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