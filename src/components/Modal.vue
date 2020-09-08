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
          <form @submit.prevent="updateItem">
            <input
              type="text"
              class="form-control form-control-sm"
              :class="{'border-danger': error}"
              @focus="error = false"
              v-model="title"
            />
            <div class="row">
              <div class="col-8 mt-2 pr-0">
                <textarea
                  class="form-control h-100"
                  placeholder="Подробное описание"
                  v-model="desc"
                ></textarea>

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
                <input
                  v-if="item && item.type !== 'napravs'"
                  type="datetime-local"
                  id="date"
                  class="form-control form-control-sm border-warning"
                  v-model="date"
                />

                <input
                  v-if="item && item.type !== 'napravs'"
                  type="datetime-local"
                  id="deadline"
                  class="form-control form-control-sm border-danger"
                  v-model="deadline"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-4">
                <select v-model="napravId" class="form-control form-control-sm mt-2">
                  <option value selected>Направление</option>
                  <option
                    v-for="item in napravs"
                    :key="'nap'+item.id"
                    :value="item.id"
                  >{{item.title}}</option>
                </select>
              </div>
              <div class="col-4">
                <select v-model="projectId" class="form-control form-control-sm mt-2">
                  <option value selected>Проект</option>
                  <option
                    v-for="item in projects"
                    :key="'nap'+item.id"
                    :value="item.id"
                  >{{item.title}}</option>
                </select>
              </div>
              <div class="col-4">
                <select v-model="status" class="form-control form-control-sm mt-2">
                  <option value="todo">К выполнению</option>
                  <option value="work">В работе</option>
                  <option value="done">Завершена</option>
                </select>
              </div>
            </div>
            <hr />

            <div class="row">
              <div class="col-4">
                <button
                  class="btn btn-block btn-sm btn-outline-danger"
                  @click.prevent="removeItem({id: item.id, type: item.type, idproj: item.idprojects})"
                >Удалить</button>
              </div>
              <div class="col-4">
                <button
                  type="button"
                  class="btn btn-sm btn-block btn-light"
                  data-dismiss="modal"
                >Отмена</button>
              </div>
              <div class="col-4">
                <button type="submit" class="btn btn-sm btn-block btn-warning">Обновить</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'

export default {
  props: ['item', 'napravs', 'projects'],
  data() {
    return {
      title: '',
      desc: '',
      status: '',
      date: '',
      deadline: '',
      napravId: '',
      napravTitle: '',
      projectId: '',
      projectTitle: '',
      color: '#ffffff',
      type: '',
      error: false,
      colors: [
        '#ffffff',
        '#f8f9fa',
        // '#e2e2dfff',
        '#d2d2cfff',
        '#e2cfc4ff',
        '#f7d9c4ff',
        '#faedcbff',
        '#c9e4deff',
        '#c6def1ff',
        '#dbcdf0ff',
        '#f2c6deff',
        '#f9c6c9ff',
      ],
    }
  },
  methods: {
    updateItem() {
      // Сделать асинхронной и выводить сообщения об ошибках
      if (this.title.trim()) {
        const item = {
          title: this.title.trim(),
          desc: this.desc,
          id: this.item.id,
          type: this.item.type,
          status: this.status,
          date: this.date,
          deadline: this.deadline,
          color: this.color,
          napravId: this.napravId,
          napravTitle: this.napravs.find((item) => item.id === this.napravId)
            .title,
          projectId: this.projectId,
          projectTitle: this.projects.find((item) => item.id === this.projectId)
            .title,
        }
        this.$store.dispatch('updateItem', item)
        let myModal = new bootstrap.Modal(
          document.getElementById('exampleModal')
        )
        myModal.hide()
      } else {
        this.error = true
      }
    },
    removeItem({ id, type, idproj }) {
      // Сделать асинхронной и выводить сообщения об ошибках
      this.$store.dispatch('removeItem', { id, type, idproj })
      let myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
      myModal.hide()
    },
  },
  watch: {
    item() {
      this.title = this.item.title
      this.desc = this.item.desc
      this.status = this.item.status
      this.date = this.item.date
      this.deadline = this.item.deadline
      this.type = this.item.type
      this.color = this.item.color
      this.napravId = this.item.napravId
      this.napravTitle = this.item.napravTitle
      this.projectId = this.item.projectId
      this.projectTitle = this.item.projectTitle
    },
  },
}
</script>

<style scoped>
.colorblock {
  width: 20px;
  height: 20px;
  cursor: pointer;
}
</style>