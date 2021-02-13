<template>
  <div class="my-project d-inline-block border rounded-1 mt-2 me-2 p-2 pb-0">
    <h6
      class="my-no-select d-flex flex-row align-items-start text-center rounded mt-1 mb-2"
      @dblclick.prevent="editItem({ id: list.id, type: list.type })"
    >
      <div class="w-100 ps-4">{{ list.title }}</div>
      <button
        tag="button"
        class="btn btn-sm btn-light border p-0 ps-2 pe-2 m-0"
        @click="saveFilter"
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
      <Item v-for="item in items" :key="'item' + item.id" :item="item" />
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
    // projectId() {
    //   if (this.list.type === 'projects') {
    //     return this.list.id
    //   }
    // },
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
    saveFilter() {
      if (this.list.type === 'napravs') {
        this.$router.push({ query: { nap: this.list.id } })
        localStorage.setItem('at-filterNaprav', this.list.id)
        localStorage.setItem('at-filterProject', '')
        localStorage.setItem('at-filterList', '')
      } else if (this.list.type === 'projects') {
        this.$router.push({
          query: { nap: this.list.napravId, proj: this.list.id },
        })
        localStorage.setItem('at-filterProject', this.list.id)
        localStorage.setItem('at-filterList', '')
      } else {
        localStorage.setItem('at-filterList', this.list.id)
      }
    },
  },
}
</script>

<style scoped>
.my-project {
  width: 210px; /* 226 for scroll */
  vertical-align: top;
  max-height: calc(100vh - 135px);
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