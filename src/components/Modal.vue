<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <!-- <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>-->
        <div class="modal-body">
          <form @submit.prevent="saveItem">
            <input
              type="text"
              class="form-control"
              :class="{'border-danger': error}"
              @focus="error = false"
              v-model="title"
            />
            <div class="row">
              <div class="col-8 mt-2">
                <input
                  type="datetime-local"
                  id="date"
                  class="form-control form-control-sm"
                  v-model="date"
                />
              </div>
              <div class="col-4 mt-2">
                <button
                  class="btn btn-block btn-sm btn-light"
                  @click="active = !active"
                >{{active ? 'Архивировать' : 'Восстановить'}}</button>
                <button
                  class="btn btn-block btn-sm btn-outline-danger"
                  @click="removeItem({id: item.id, type: item.type})"
                >Удалить</button>
              </div>
            </div>
            <hr />

            <div class="row">
              <div class="col-4"></div>
              <div class="col-4">
                <button
                  type="button"
                  class="btn btn-sm btn-block btn-light"
                  data-dismiss="modal"
                >Отмена</button>
              </div>
              <div class="col-4">
                <button type="submit" class="btn btn-sm btn-block btn-success">Сохранить</button>
              </div>
            </div>
          </form>
        </div>
        <!-- <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-light" data-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-sm btn-success">Сохранить</button>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      title: '',
      active: '',
      date: '',
      error: false
    }
  },
  methods: {
    saveItem() {
      if (this.title.trim()) {
        const item = {
          title: this.title.trim(),
          id: this.item.id,
          type: this.item.type,
          active: this.active, // done, arhive
          date: this.date
        }
        this.$store.dispatch('updateItem', item)
        $('#exampleModal').modal('hide')
      } else {
        this.error = true
      }
    },
    removeItem({ id, type }) {
      this.$store.dispatch('removeItem', { id, type })
    }
  },
  watch: {
    item() {
      this.title = this.item.title
      this.active = this.item.active
      this.date = this.item.date
    }
  }
}
</script>