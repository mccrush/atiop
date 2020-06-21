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
                <div v-if="item">
                  <div v-if="item.type === 'projects'" class="d-flex mt-1">
                    <div
                      v-for="(scolor, index) in colors"
                      :key="'cb'+index"
                      class="m-1 p-1 rounded shadow-sm colorblock"
                      :style="'background:'+ scolor"
                      :class="{'rounded-circle': color === scolor}"
                      @click="color = scolor"
                    ></div>
                  </div>
                </div>
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
      color: '#ffffff',
      type: '',
      error: false,
      colors: [
        '#ffffffff',
        '#e2e2dfff',
        '#d2d2cfff',
        '#e2cfc4ff',
        '#f7d9c4ff',
        '#faedcbff',
        '#c9e4deff',
        '#c6def1ff',
        '#dbcdf0ff',
        '#f2c6deff',
        '#f9c6c9ff'
      ]
    }
  },
  methods: {
    saveItem() {
      if (this.title.trim()) {
        const item = {
          title: this.title.trim(),
          id: this.item.id,
          type: this.item.type,
          active: this.active,
          date: this.date,
          color: this.color
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
      this.type = this.item.type
      this.color = this.item.color
    }
  }
}
</script>

<style scoped>
.colorblock {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>