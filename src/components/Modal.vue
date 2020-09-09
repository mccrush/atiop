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
        <div class="modal-body">
          <form @submit.prevent="updateItem">
            <input
              type="text"
              class="form-control form-control-sm"
              :class="{'border-danger': error}"
              @focus="error = false"
              v-model.trim="title"
            />
            <div class="row mt-2">
              <div class="col-4">
                <input
                  v-if="item && item.type !== 'napravs'"
                  type="datetime-local"
                  id="date"
                  class="form-control form-control-sm border-warning"
                  v-model="date"
                />
              </div>
              <div class="col-4">
                <input
                  v-if="item && item.type !== 'napravs'"
                  type="datetime-local"
                  id="deadline"
                  class="form-control form-control-sm border-danger"
                  v-model="deadline"
                />
              </div>
              <div class="col-4">
                <select v-model="status" class="form-control form-control-sm">
                  <option
                    v-for="item in statusArr"
                    :key="'sta'+item.id"
                    :value="item.id"
                  >{{item.title}}</option>
                </select>
              </div>
            </div>

            <div class="row mt-2">
              <div class="col-4">
                <select v-model="napravId" class="form-control form-control-sm">
                  <option value selected>Направление</option>
                  <option
                    v-for="item in napravs"
                    :key="'nap'+item.id"
                    :value="item.id"
                  >{{item.title}}</option>
                </select>
              </div>
              <div class="col-4">
                <select
                  v-model="projectId"
                  class="form-control form-control-sm"
                  :disabled="!napravId"
                >
                  <option value selected>Проект</option>
                  <option
                    v-for="item in projectsFilter"
                    :key="'pro'+item.id"
                    :value="item.id"
                  >{{item.title}}</option>
                </select>
              </div>
              <div class="col-4">
                <input
                  v-if="item"
                  type="number"
                  max="999"
                  min="0"
                  step="1"
                  id="position"
                  class="form-control form-control-sm"
                  v-model.number="position"
                />
              </div>
            </div>

            <div class="row">
              <div class="col-12 mt-2">
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
      position: 0,
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
  computed: {
    statusArr() {
      return this.$store.getters.status
    },
    projectsFilter() {
      if (this.napravId) {
        return this.projects.filter((item) => item.napravId === this.napravId)
      } else {
        return this.projects
      }
    },
  },
  methods: {
    updateItem() {
      // Сделать асинхронной и выводить сообщения об ошибках
      if (this.title.trim()) {
        const napravTitle = this.napravs.find(
          (item) => item.id === this.napravId
        )
          ? this.napravs.find((item) => item.id === this.napravId).title
          : ''

        const projectTitle = this.projects.find(
          (item) => item.id === this.projectId
        )
          ? this.projects.find((item) => item.id === this.projectId).title
          : ''

        console.log('navT:', napravTitle, 'projT', projectTitle)

        const item = {
          title: this.title.trim(),
          desc: this.desc,
          id: this.item.id,
          type: this.item.type,
          position: +this.position,
          status: this.status,
          date: this.date,
          deadline: this.deadline || '',
          color: this.color,
          napravId: this.napravId,
          napravTitle: napravTitle,
          projectId: this.projectId,
          projectTitle: projectTitle,
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
      this.position = +this.item.position
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