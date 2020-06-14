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
      <div class="modal-content">
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
                <div class="form-group">
                  <label for="date">
                    <small>Срок выполнения</small>
                  </label>
                  <input
                    type="datetime-local"
                    id="date"
                    class="form-control form-control-sm"
                    v-model="date"
                  />
                </div>
              </div>
              <div class="col-4 mt-2">
                <button
                  class="btn btn-block btn-sm"
                  :class="classDone"
                  @click="changeStatus('done')"
                >{{this.status === 'done' ? 'Завершена' : 'Завершить'}}</button>
                <button
                  class="btn btn-block btn-sm"
                  :class="classArhive"
                  @click="changeStatus('arhive')"
                >{{this.status === 'arhive' ? 'В архиве' : 'В архив'}}</button>
                <button
                  class="btn btn-block btn-sm btn-outline-danger"
                  @click="removeItem({id: item.id, type: item.type})"
                >Удалить</button>
              </div>
            </div>
            <hr />

            <div class="row">
              <div class="col-3"></div>
              <div class="col-3"></div>
              <div class="col-3">
                <button
                  type="button"
                  class="btn btn-sm btn-block btn-light"
                  data-dismiss="modal"
                >Отмена</button>
              </div>
              <div class="col-3">
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
export default {
  props: {
    item: {
      type: Object
    }
  },
  data() {
    return {
      title: '',
      status: '',
      date: '',
      error: false,
      classDone: 'btn-outline-success',
      classArhive: 'btn-outline-secondary'
    }
  },
  methods: {
    saveItem() {
      if (this.title.trim()) {
        const item = {
          title: this.title.trim(),
          id: this.item.id,
          status: this.status, // done, arhive
          date: this.date
        }
        //this.$store.dispatch('updateItem', item)
      } else {
        this.error = true
      }
    },
    changeStatus(status) {
      this.status = status
      if (status === 'done') {
        this.classDone = 'btn-success'
        this.classArhive = 'btn-outline-secondary'
      } else {
        this.classArhive = 'btn-secondary'
        this.classDone = 'btn-outline-success'
      }
    }
  },
  watch: {
    item() {
      this.title = this.item.title
      this.status = this.item.status
      this.date = this.item.date

      this.classDone =
        this.item.status === 'done' ? 'btn-success' : 'btn-outline-success'
      this.classArhive =
        this.item.status === 'arhive'
          ? 'btn-secondary'
          : 'btn-outline-secondary'
    }
  }
}
</script>