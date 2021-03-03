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
        @click="setId"
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

    <div class="task-list">
      <Item
        v-for="item in items"
        :key="'item' + item.id"
        :item="item"
        @edit-item="editItem"
      />
      <AddItem v-if="list.type === 'lists'" :type="'tasks'" :listId="list.id" />
    </div>
  </div>
</template>

<script>
import Item from '@/components/item/Item'
import AddItem from '@/components/item/AddItem'

export default {
  components: {
    Item,
    AddItem,
  },
  props: ['list'],
  computed: {
    items() {
      if (this.list.type === 'napravs') {
        return this.$store.getters.projects2.filter(
          (proj) => proj.napravId === this.list.id
        )
      } else if (this.list.type === 'projects') {
        return this.$store.getters.tasks2.filter(
          (task) => task.projectId === this.list.id
        )
      } else if (this.list.type === 'lists') {
        return this.$store.getters.tasks2.filter(
          (task) => task.listId === this.list.id
        )
      }
    },
  },
  methods: {
    setId() {
      if (this.list.type === 'napravs') {
        this.$store.commit('setId', { id: this.list.id, typeId: 'napravId' })
        this.$store.commit('setId', { id: '', typeId: 'projectId' })
        this.$store.commit('setId', { id: '', typeId: 'listId' })
      } else if (this.list.type === 'projects') {
        this.$store.commit('setId', { id: this.list.id, typeId: 'projectId' })
        this.$store.commit('setId', { id: '', typeId: 'listId' })
      } else {
        this.$store.commit('setId', { id: this.list.id, typeId: 'listId' })
      }
    },
    editItem({ id, type }) {
      this.$emit('edit-item', { id, type })
    },
  },
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
  max-height: calc(100vh - 178px);
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