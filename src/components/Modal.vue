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
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <input type="text" class="form-control" v-model="title" />

            <div class="row">
              <div class="col-8">
                <input type="datetime-local" v-model="date" />
              </div>
              <div class="col-4">
                <button class="btn btn-block btn-sm btn-success">Завершить</button>
                <button class="btn btn-block btn-sm btn-light">В архив</button>
                <button class="btn btn-block btn-sm btn-danger">Удалить</button>
              </div>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-sm btn-light" data-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-sm btn-success">Сохранить</button>
        </div>
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
      date: ''
    }
  },
  mounted() {
    console.log(this.item)

    if (this.item) {
      this.title = this.item.title
      this.status = this.item.status
      this.date = this.item.date
    }
  }
}
</script>