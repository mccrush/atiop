<template>
  <div
    class="modal fade"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content border-0 shadow">
        <div class="grey-top">
          <!-- Grey top -->
        </div>
        <div class="modal-body pb-2">
          <div class="row">
            <div class="col-10">
              <input
                type="text"
                class="form-control form-control-sm"
                :class="{ 'border-danger': error }"
                @focus="changes = true"
                v-model.trim="item.title"
              />
            </div>
            <div v-if="item.type === 'tasks'" class="col-2 ps-0">
              <div class="input-group input-group-sm">
                <input
                  type="number"
                  max="360"
                  min="0"
                  step="5"
                  class="form-control form-control-sm"
                  aria-describedby="for-time"
                  @focus="changes = true"
                  v-model.trim="item.time"
                />
                <span class="input-group-text ps-1 pe-1" id="for-time"
                  >мин</span
                >
              </div>
            </div>
          </div>

          <div v-if="item.type === 'tasks'" class="row mt-2">
            <div class="col-12">
              <textarea
                cols="30"
                rows="4"
                @focus="changes = true"
                v-model.trim="item.description"
                class="form-control form-control-sm w-100"
              ></textarea>
            </div>
          </div>

          <div v-if="item.type === 'tasks'" class="row mt-2">
            <div class="col-4 pe-0">
              <div class="form-floating">
                <input
                  @change="changes = true"
                  type="datetime-local"
                  id="date"
                  class="form-control form-control-sm border-warning"
                  v-model="item.date"
                />
                <label for="date">Выполнение</label>
              </div>
            </div>
            <div class="col-4 pe-0">
              <div class="form-floating">
                <input
                  @change="changes = true"
                  :disabled="item && item.type === 'napravs'"
                  type="datetime-local"
                  id="deadline"
                  class="form-control form-control-sm border-danger"
                  v-model="item.deadline"
                />
                <label for="deadline">Сдача</label>
              </div>
            </div>
            <div class="col-4">
              <div class="form-floating">
                <select
                  @change="changes = true"
                  v-model="item.status"
                  class="form-select form-select-sm"
                  id="statusSelect"
                >
                  <option
                    v-for="item in statusArr"
                    :key="'sta' + item.id"
                    :value="item.id"
                  >
                    {{ item.title }}
                  </option>
                </select>
                <label for="statusSelect">Статус</label>
              </div>
            </div>
          </div>

          <div v-if="item.type === 'tasks'" class="row mt-2">
            <div class="col-4 pe-0">
              <div class="form-floating">
                <select
                  @change="changes = true"
                  v-model="item.napravId"
                  class="form-select form-select-sm"
                  id="napravSelect"
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
                <label for="napravSelect">Направление</label>
              </div>
            </div>

            <div class="col-4 pe-0">
              <div class="form-floating">
                <select
                  @change="changes = true"
                  v-model="item.projectId"
                  class="form-select form-select-sm"
                  :disabled="!item.napravId"
                  id="projectSelect"
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
                <label for="projectSelect">Проект</label>
              </div>
            </div>

            <div class="col-4">
              <div class="form-floating">
                <select
                  @change="changes = true"
                  v-model="item.listId"
                  class="form-select form-select-sm"
                  :disabled="!item.projectId"
                  id="listSelect"
                >
                  <option value selected>Список</option>
                  <option
                    v-for="item in listsFilter"
                    :key="'lis' + item.id"
                    :value="item.id"
                  >
                    {{ item.title }}
                  </option>
                </select>
                <label for="listSelect">Список</label>
              </div>
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-4 pe-0">
              <button
                class="btn btn-sm btn-outline-danger w-100"
                data-bs-dismiss="modal"
                @click.prevent="
                  removeItem({
                    id: item.id,
                    type: item.type
                  })
                "
              >
                Удалить
              </button>
            </div>

            <div class="col-4"></div>

            <div class="col-2">
              <div class="form-floating">
                <input
                  v-if="item"
                  type="number"
                  max="99"
                  min="0"
                  step="1"
                  id="position"
                  class="form-control form-control-sm"
                  @focus="changes = true"
                  v-model.number="item.position"
                />
                <label for="position">#</label>
              </div>
            </div>
            <div v-if="item.type === 'tasks'" class="col-2 ps-0">
              <div class="form-floating">
                <input
                  v-if="item"
                  type="number"
                  max="99999"
                  min="0"
                  step="50"
                  id="price"
                  class="form-control form-control-sm"
                  @focus="changes = true"
                  v-model.number="item.price"
                />
                <label for="price">Цена</label>
              </div>
            </div>
          </div>

          <hr class="mb-1" />

          <div class="row">
            <div class="col-12 text-center">
              <span class="small text-body-secondary">
                Данные сохраняются автоматически при закрытии модального окна
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getDateNow from './../../scripts/getDateNow'
import getStatus from './../../scripts/getStatus'

export default {
  props: {
    item: {
      type: Object,
      default: null
    },
    napravs: Array,
    projects: Array,
    lists: Array
  },
  data() {
    return {
      changes: false,
      error: false,
      statusArr: getStatus
    }
  },
  mounted() {
    var myModalEl = document.getElementById('exampleModal')
    myModalEl.addEventListener('hidden.bs.modal', () => {
      if (this.changes) {
        this.updateItem()
      }
    })
  },
  computed: {
    projectsFilter() {
      if (this.item.napravId) {
        return this.projects.filter(
          item => item.napravId === this.item.napravId
        )
      } else {
        return this.projects
      }
    },
    listsFilter() {
      if (this.item.projectId) {
        return this.lists.filter(item => item.projectId === this.item.projectId)
      } else {
        return this.lists
      }
    }
  },
  methods: {
    async updateItem() {
      console.log('ModForm updateItem() is run')
      if (this.item.title) {
        if (this.item.napravId) {
          this.item.napravTitle = this.napravs.find(
            item => item.id === this.item.napravId
          ).title
        } else {
          this.item.napravTitle = 'Без направления'
        }

        if (this.item.projectId) {
          this.item.projectTitle = this.projects.find(
            item => item.id === this.item.projectId
          ).title
        } else {
          this.item.projectTitle = 'Без проекта'
        }

        if (this.listId) {
          this.item.listTitle = this.lists.find(
            item => item.id === this.listId
          ).title
        } else {
          this.item.listTitle = 'Inbox'
        }

        const res = await this.$store.dispatch('updateItem', {
          id: this.item.id,
          type: this.item.type
        })
        if (res) {
          this.changes = false
          this.$store.commit('addMessage', 'dus')
        } else {
          this.$store.commit('addMessage', 'due')
        }
      } else {
        alert('Поле заголовка не может быть пустым')
        this.error = true
      }
    },
    async removeItem({ id, type }) {
      this.changes = false
      this.$store.commit('removeItem', { id, type })
      const res = await this.$store.dispatch('removeItem', { id })
      if (res) {
        this.$store.commit('addMessage', 'ris')
      } else {
        this.$store.commit('addMessage', 'rie')
      }
    },

    async changeTaskStatus() {
      this.$store.commit('changeTaskStatus', {
        id: this.item.id,
        type: this.item.type,
        status: this.item.status,
        dateStart:
          this.item.status === 'work' ? getDateNow : this.item.dateStart,
        dateDone: this.item.status === 'done' ? getDateNow : ''
      })

      const res = await this.$store.dispatch('updateItem', {
        id: this.item.id,
        type: this.item.type
      })
      if (res) {
        this.$store.commit('addMessage', 'dus')
      } else {
        this.$store.commit('addMessage', 'due')
      }
    }
  }
}
</script>

<style scoped>
@media (min-width: 576px) {
  .modal-dialog {
    max-width: 640px;
    margin: 1.75rem auto;
  }
}

.colorblock {
  width: 32px;
  height: 20px;
  cursor: pointer;
}

.grey-top {
  height: 32px;
  background: #e9ecef;
  margin-top: 1px;
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}
</style>