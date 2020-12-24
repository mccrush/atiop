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
          <form>
            <input
              type="text"
              class="form-control form-control-sm"
              :class="{ 'border-danger': error }"
              @focus="error = false"
              v-model.trim="title"
            />
            <div class="row mt-2">
              <div class="col-4 pe-0">
                <input
                  :disabled="item && item.type === 'napravs'"
                  type="datetime-local"
                  id="date"
                  class="form-control form-control-sm border-warning"
                  v-model="date"
                />
              </div>
              <div class="col-4 pe-0">
                <input
                  :disabled="item && item.type === 'napravs'"
                  type="datetime-local"
                  id="deadline"
                  class="form-control form-control-sm border-danger"
                  v-model="deadline"
                />
              </div>
              <div class="col-4">
                <select
                  v-model="status"
                  @change="changeStatus"
                  :disabled="
                    item &&
                    (item.type === 'napravs' || item.type === 'projects')
                  "
                  class="form-control form-control-sm"
                >
                  <option
                    v-for="item in statusArr"
                    :key="'sta' + item.id"
                    :value="item.id"
                  >
                    {{ item.title }}
                  </option>
                </select>
              </div>
            </div>

            <div class="row mt-2">
              <div class="col-4 pe-0">
                <select
                  v-model="napravId"
                  :disabled="item && item.type === 'napravs'"
                  class="form-control form-control-sm"
                >
                  <option value selected>Направление</option>
                  <option
                    v-for="item in napravs"
                    :key="'nap' + item.id"
                    :value="item.id"
                  >
                    {{ item.title }}
                  </option>
                </select>
              </div>
              <div class="col-4 pe-0">
                <select
                  v-model="projectId"
                  class="form-control form-control-sm"
                  :disabled="
                    !napravId ||
                    item.type === 'napravs' ||
                    item.type === 'projects'
                  "
                >
                  <option value selected>Проект</option>
                  <option
                    v-for="item in projectsFilter"
                    :key="'pro' + item.id"
                    :value="item.id"
                  >
                    {{ item.title }}
                  </option>
                </select>
              </div>
              <div class="col-2">
                <input
                  v-if="item"
                  type="number"
                  max="99"
                  min="0"
                  step="1"
                  id="position"
                  class="form-control form-control-sm"
                  v-model.number="position"
                />
              </div>
              <div class="col-2 ps-0">
                <input
                  v-if="item"
                  type="number"
                  max="99999"
                  min="0"
                  step="100"
                  id="price"
                  class="form-control form-control-sm"
                  v-model.number="price"
                  :disabled="
                    item.type === 'napravs' || item.type === 'projects'
                  "
                />
              </div>
            </div>

            <div v-if="item" class="row">
              <!-- Возможно сделать описание опциональным -->
              <div class="col-12">
                <!-- <textarea
                  class="form-control h-100"
                  placeholder="Подробное описание"
                  v-model="desc"
                ></textarea>-->

                <div
                  v-if="item.type === 'projects'"
                  class="d-flex justify-content-between mt-2"
                >
                  <div
                    v-for="(scolor, index) in colors"
                    :key="'cb' + index"
                    class="m-1 p-1 rounded shadow-sm colorblock"
                    :style="'background:' + scolor"
                    :class="{ 'rounded-circle': color === scolor }"
                    @click="color = scolor"
                  ></div>
                </div>
              </div>
            </div>
            <hr />

            <div class="row">
              <div class="col-4 pe-0">
                <button
                  class="btn btn-sm btn-outline-danger w-100"
                  @click.prevent="
                    removeItem({
                      id: item.id,
                      type: item.type,
                      idproj: item.projectId,
                    })
                  "
                >
                  Удалить
                </button>
              </div>
              <div class="col-4 pe-0">
                <button
                  type="button"
                  class="btn btn-sm btn-light w-100"
                  data-dismiss="modal"
                >
                  Отмена
                </button>
              </div>
              <div class="col-4">
                <button
                  type="button"
                  @click="updateItem"
                  class="btn btn-sm btn-warning w-100"
                >
                  Обновить
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
//import bootstrap from 'bootstrap/dist/js/bootstrap.min.js'
import getDateNow from '@/scripts/getDateNow'

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
      color: '',
      type: '',
      position: 0,
      price: 0,
      error: false,
      colors: [
        '',
        '#f8f9fa',
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
      if (this.title) {
        let napravTitle
        if (this.napravId) {
          napravTitle = this.napravs.find((item) => item.id === this.napravId)
            .title
        } else {
          napravTitle = 'Без направления'
        }

        let projectTitle
        if (this.projectId) {
          projectTitle = this.projects.find(
            (item) => item.id === this.projectId
          ).title
        } else {
          projectTitle = 'Без проекта'
        }

        const item = {
          title: this.title,
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
          price: +this.price,
        }

        this.$store.dispatch('updateItem', item)
        let myModal = new Modal(document.getElementById('exampleModal'))
        myModal.hide()
      } else {
        this.error = true
      }
    },
    removeItem({ id, type, idproj }) {
      // Сделать асинхронной и выводить сообщения об ошибках
      this.$store.dispatch('removeItem', { id, type, idproj })
      let myModal = new Modal(document.getElementById('exampleModal'))
      myModal.hide()
    },
    changeStatus() {
      this.$store.dispatch('changeStatus', {
        id: this.item.id,
        type: this.item.type,
        status: this.status,
        dateStart: this.status === 'work' ? getDateNow : this.item.dateStart,
        dateDone: this.status === 'done' ? getDateNow : '',
      })
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
      this.price = +this.item.price
    },
  },
}
</script>

<style scoped>
.colorblock {
  width: 32px;
  height: 20px;
  cursor: pointer;
}
</style>