<template>
  <div class="mt-2 me-2 rounded-1 d-inline-block border my-project">
    <h6
      class="text-center pt-3 pe-2 rounded m-0 d-flex flex-row align-items-start my-no-select"
      @dblclick.prevent="editItem({ id: list.id, type: list.type })"
    >
      <div class="w-100 ps-4">{{ list.title }}</div>
      <router-link
        :to="'/project/' + list.id"
        tag="button"
        title="В проект"
        class="btn btn-sm btn-light border p-0 ps-2 pe-2 m-0"
        >In</router-link
      >
    </h6>

    <div class="task-list">Список элементов</div>

    <AddItem v-if="list.type === 'lists'" :type="'tasks'" />
  </div>
</template>

<script>
import AddItem from '@/components/item/AddItem'

export default {
  components: {
    AddItem,
  },
  props: ['list'],
  // computed: {
  //   projectId() {
  //     if (this.list.type === 'projects') {
  //       return this.list.id
  //     }
  //   },
  // },
  methods: {
    editItem() {},
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