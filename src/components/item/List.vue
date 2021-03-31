<template>
  <div
    class="d-inline-block bg-white border rounded-1 p-0 ms-2 me-2 my-project"
  >
    <h6
      class="my-no-select d-flex flex-row align-items-start text-center rounded mt-2 mb-2"
      @dblclick.prevent="editItem({ id: list.id, type: list.type })"
    >
      <div class="w-100" :class="{ 'ps-4': list.type !== 'lists' }">
        {{ list.title }}
      </div>
      <button
        v-if="list.type !== 'lists'"
        tag="button"
        class="btn btn-sm btn-light border p-0 ps-2 pe-2 m-0 me-2"
        @click="setId(list.type)"
      >
        In
      </button>
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
import Item from '@/components/item/Item'
import AddItem from '@/components/item/AddItem'

export default {
  components: {
    Item,
    AddItem
  },
  props: ['list'],
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
            task => new Date(task.date).getTime() === new Date().getTime()
          )
        } else if (this.list.mode === 'lastday') {
          return this.$store.getters.tasks.filter(
            task => new Date(task.date).getTime() < new Date().getTime()
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

.btn-light {
  background-color: #fff;
  color: #dee2e6;
}

.btn-light:hover {
  background-color: #e2e6ea;
  color: #212529;
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