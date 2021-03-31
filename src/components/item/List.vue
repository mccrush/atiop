<template>
  <div
    class="d-inline-block bg-white border rounded-1 p-0 ms-2 me-2 my-project"
  >
    <h6
      class="my-no-select d-flex flex-row align-items-start text-center rounded mt-2 mb-2"
      @dblclick.prevent="editItem({ id: list.id, type: list.type })"
    >
      <div class="w-100 ps-4">
        {{ list.title }}
      </div>
      <button
        v-if="list.type !== 'lists' && list.type !== 'person'"
        tag="button"
        class="my-btn-light btn btn-sm btn-light border p-0 ps-2 pe-2 m-0 me-2"
        @click="setId(list.type)"
      >
        In
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
      <ul class="dropdown-menu border-0 shadow" aria-labelledby="dropdownSort">
        <li
          v-for="sort in sorts"
          :key="sort.id"
          class="my-dropdown-item dropdown-item"
          @click="setSelectSort(sort.id, sort.name)"
        >
          <button class="my-dropdown-btn btn w-100 btn-sm btn-light border">
            {{ sort.title }}
          </button>
        </li>
        <!-- <li>
          <hr class="dropdown-divider" />
        </li> -->
        <li class="ps-3 pt-1 pe-3 pb-1">
          <div class="btn-group w-100" role="group">
            <button
              class="my-dropdown-btn btn btn-sm btn-light border w-50 p-0 pb-1 ps-2 pe-2"
              :class="{ 'my-dropdown-select': true }"
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
              class="my-dropdown-btn btn btn-sm btn-light border w-50 p-0 pb-1 ps-2 pe-2"
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
      <!-- <div class="btn btn-sm btn-light border-0 p-0 ps-1 pe-1 m-0 ms-2">
        <img
          src="/img/icons_tool/three-dots-vertical.svg"
          width="16"
          height="16"
          alt="Options"
        />
      </div> -->
    </h6>

    <div class="task-list pb-2">
      <Item
        v-for="item in sortTasks"
        :key="'item' + item.id"
        :item="item"
        @edit-item="editItem"
        @set-id="setId"
        @update-index="updateIndex"
      />
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
import sortMethod from '@/scripts/sortMethod'
import getSorts from '@/scripts/getSorts'
import Item from '@/components/item/Item'
import AddItem from '@/components/item/AddItem'

export default {
  components: {
    Item,
    AddItem
  },
  props: ['list'],
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
      return this.$store.getters.settings
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
      return sortMethod(this.itemsFilterArchive, true, 'position')
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
    setSelectSort(id, name) {
      console.log('Sort id = ', id, ' name = ', name)
    }
  }
}
</script>

<style scoped>
.my-project {
  width: 210px; /* 226 for scroll */
  vertical-align: top;
  height: auto;
  max-height: calc(100vh - 92px);
  overflow-y: hidden;
}

.my-no-select {
  user-select: none;
}

.task-list {
  max-height: calc(100vh - 134px);
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