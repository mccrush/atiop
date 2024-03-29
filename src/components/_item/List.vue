<template>
  <div
    class="d-inline-block bg-white border rounded-1 p-0 ms-1 me-1 my-project"
  >
    <h6
      class="my-no-select d-flex flex-row align-items-start text-center border-bottom pt-2 pb-2"
      @dblclick.prevent="editItem({ id: list.id, type: list.type })"
    >
      <div class="w-100 pt-1" :class="{ 'ps-4': list.type !== 'person' }">
        {{ list.title }}
      </div>
      <button
        v-if="list.type !== 'lists' && list.type !== 'person'"
        tag="button"
        class="my-btn-light btn btn-sm btn-light border p-0 pb-1 ps-2 pe-2 m-0 me-2"
        @click="setId(list.type)"
        title="Перейти в проект"
      >
        <img
          src="/img/icons_tool/box-arrow-in-right.svg"
          width="16"
          height="16"
          alt="Inner"
          class="opacity-04"
        />
      </button>
      <button
        v-if="list.type === 'lists' || list.type === 'person'"
        tag="button"
        class="my-btn-light btn btn-sm btn-light border p-0 pb-1 ps-2 pe-2 m-0 me-2"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        id="dropdownSort"
      >
        <img
          src="/img/icons_tool/sort-down-alt.svg"
          width="16"
          height="16"
          alt="Sort"
          class="opacity-04"
        />
      </button>
      <ul
        class="my-cursor-default dropdown-menu border-0 shadow"
        aria-labelledby="dropdownSort"
      >
        <li
          v-for="sort in sorts"
          :key="sort.id"
          class="my-dropdown-item my-cursor-default dropdown-item"
        >
          <div class="btn-group w-100" role="group">
            <button class="my-cursor-default btn w-50 btn-sm btn-light border">
              {{ sort.title }}
            </button>
            <button
              class="my-dropdown-btn btn btn-sm btn-light border w-25 p-0 pb-1 ps-2 pe-2"
              :class="{
                'my-dropdown-select':
                  list.sortField === sort.id && list.sortDir === 'asc'
              }"
              @click="setSelectSort(sort.id, 'asc')"
            >
              <img
                src="/img/icons_tool/sort-down-alt.svg"
                width="16"
                height="16"
                alt="Sort"
                class="opacity-06"
              />
            </button>
            <button
              class="my-dropdown-btn btn btn-sm btn-light border w-25 p-0 pb-1 ps-2 pe-2"
              :class="{
                'my-dropdown-select':
                  list.sortField === sort.id && list.sortDir === 'desc'
              }"
              @click="setSelectSort(sort.id, 'desc')"
            >
              <img
                src="/img/icons_tool/sort-down.svg"
                width="16"
                height="16"
                alt="Sort"
                class="opacity-06"
              />
            </button>
          </div>
        </li>
      </ul>
    </h6>

    <div class="task-list">
      <Item
        v-for="item in sortTasks"
        :key="'item' + item.id"
        :item="item"
        @edit-item="editItem"
        @set-id="setId"
        @update-index="updateIndex"
      />
    </div>
    <div class="border-top pt-2 pb-2">
      <span
        v-if="settings.showPrice && sumOfList"
        class="badge bg-warning ms-2 mb-2 ps-2 pe-2"
      >
        {{ priceFormat }} ₽</span
      >
      <span
        v-if="settings.showTime && sumOfTime"
        class="badge bg-secondary ms-2 mb-2 ps-2 pe-2"
      >
        {{ sumOfTime }} мин</span
      >

      <div v-if="list.type === 'napravs'" class="ms-2 me-2">
        <AddItem :type="'projects'" :napravId="list.id" />
      </div>
      <div v-if="list.type === 'projects'" class="ms-2 me-2">
        <AddItem :type="'tasks'" :projectId="list.id" />
      </div>
      <div v-if="list.type === 'lists'" class="ms-2 me-2">
        <AddItem :type="'tasks'" :listId="list.id" />
      </div>
    </div>
  </div>
</template>

<script>
import sortMethod from './../../scripts/sortMethod'
import getSorts from './../../scripts/getSorts'
import Item from './Item.vue'
import AddItem from './AddItem.vue'

export default {
  components: {
    Item,
    AddItem
  },
  props: {
    list: {
      type: Object
    }
  },
  data() {
    return {
      sorts: getSorts
    }
  },
  computed: {
    items() {
      if (this.list.type === 'napravs') {
        return this.$store.getters.projects.filter(
          proj => proj.napravId === this.list.id
        )
      } else if (this.list.type === 'projects') {
        return this.$store.getters.tasks.filter(
          task => task.projectId === this.list.id
        )
      } else if (this.list.type === 'lists') {
        return this.$store.getters.tasks.filter(
          task => task.listId === this.list.id
        )
      } else if (this.list.type === 'person') {
        if (this.list.mode === 'today') {
          return this.$store.getters.tasks.filter(
            task =>
              Math.ceil(
                (new Date(task.date).getTime() - new Date().getTime()) /
                  (1000 * 3600 * 24)
              ) === 1
          )
        } else if (this.list.mode === 'lastday') {
          return this.$store.getters.tasks.filter(
            task =>
              Math.ceil(
                (new Date(task.date).getTime() - new Date().getTime()) /
                  (1000 * 3600 * 24)
              ) < 1 && task.status !== 'done'
          )
        } else if (this.list.mode === 'nexttask') {
          return this.$store.getters.tasks.filter(
            task => task.status === 'work'
          )
        }
      }
    },
    settings() {
      return this.$store.getters.settingsObj
    },
    itemsFilterArchive() {
      if (
        (this.list.type === 'projects' ||
          this.list.type === 'lists' ||
          this.list.type === 'person') &&
        !this.settings.showArhived
      ) {
        return this.items.filter(item => item.status !== 'done')
      } else {
        return this.items
      }
    },
    sortTasks() {
      return sortMethod(
        this.itemsFilterArchive,
        this.list.sortDir,
        this.list.sortField
      )
    },
    sumOfList() {
      return this.sortTasks.reduce((accum, elem) => accum + elem.price, 0)
    },
    sumOfTime() {
      return this.sortTasks.reduce((accum, elem) => accum + +elem.time, 0)
    },
    priceFormat() {
      if (this.sumOfList) {
        if (this.sumOfList.toString().length > 4) {
          return new Intl.NumberFormat('ru-RU').format(this.sumOfList)
        } else {
          return this.sumOfList
        }
      }
    }
  },
  methods: {
    setId(type) {
      if (type === 'napravs') {
        this.$store.commit('setNapravId', this.list.id)
        this.$store.commit('setProjectId', '')
        this.$store.commit('setViewType', 'projects')
      } else if (type === 'projects') {
        this.$store.commit('setNapravId', this.list.napravId)
        this.$store.commit('setProjectId', this.list.id)
        this.$store.commit('setViewType', 'projects')
      }
    },
    editItem({ id, type }) {
      this.$emit('edit-item', { id, type })
    },
    updateIndex({ id, status }) {
      if (status === 'work') {
        let currentArray = sortMethod(this.items, true, 'position')

        const index = currentArray.findIndex(item => item.id === id)
        const currentItem = currentArray[index]
        currentArray.splice(index)
        currentArray.unshift(currentItem)

        currentArray.forEach((item, index) => {
          this.$store.commit('updateTaskPosition', {
            id: item.id,
            position: index + 1
          })
        })

        currentArray.forEach(item => {
          this.$store.dispatch('updateItem', {
            id: item.id,
            type: item.type
          })
        })
      } else if (status === 'done') {
        this.$store.dispatch('updateItem', {
          id,
          type: 'tasks'
        })
      }
    },
    // Сортировка работает только для списков в виде item
    setSelectSort(id, dir) {
      console.log('Sort id = ', id, ' dir = ', dir)
      this.list.sortField = id
      this.list.sortDir = dir

      if (this.list.type !== 'person') {
        this.$store.dispatch('updateItem', {
          id: this.list.id,
          type: 'lists'
        })
      }
    }
  }
}
</script>

<style scoped>
.my-project {
  width: 266px;
  vertical-align: top;
  height: auto;
  /* max-height: calc(100vh - 132px);  -92 */
  overflow-y: hidden;
}

.my-no-select {
  user-select: none;
}

.task-list {
  max-height: calc(100vh - 224px); /* -134 */
  overflow-y: auto;
  overflow-x: hidden;
}

.my-btn-light {
  background-color: #fff;
  color: #dee2e6;
}

.my-btn-light:hover {
  background-color: #e2e6ea;
  color: #212529;
}

.opacity-04 {
  opacity: 0.4;
}

.opacity-06 {
  opacity: 0.6;
}

.my-dropdown-item:focus,
.my-dropdown-item:hover {
  background-color: #fff;
}

.my-dropdown-btn:hover {
  background-color: #dee2e6;
}

.my-dropdown-select {
  background-color: #dee2e6;
}

.my-cursor-default {
  cursor: default;
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 0.2rem;
  margin-top: 8px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 0.2rem;
}

::-webkit-scrollbar-thumb:hover {
  background: #a9a9a9;
}

::-webkit-scrollbar-thumb:active {
  background: #787878;
}
</style>