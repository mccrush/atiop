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
          <form>
            <input type="text" class="form-control" v-model="title" />
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
                <button class="btn btn-block btn-sm btn-outline-success">Завершить</button>
                <button class="btn btn-block btn-sm btn-outline-secondary">В архив</button>
                <button class="btn btn-block btn-sm btn-outline-danger">Удалить</button>
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
  watch: {
    item() {
      this.title = this.item.title
      this.status = this.item.status
      this.date = this.item.date

      console.log(this.date)
    }
  }
}
</script>