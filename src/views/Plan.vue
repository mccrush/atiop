<template>
  <div>
    <!-- Строка фильтров -->
    <div class="row p-0 border-bottom">
      <div class="col-3 col-xxl-2 p-2">
        <input
          type="text"
          class="form-control form-control-sm border-0 bg-light"
          placeholder="---"
        />
      </div>
    </div>
    <!-- Конец Строка фильтров -->

    <div class="row overflow-auto my-row-project">
      <div class="my-width-none">
        <div class="mt-2 mr-2 rounded-sm d-inline-block border my-project">
          <h6 class="text-center pt-3 pr-2 m-0">План дня</h6>
          <br />---
        </div>
        <div class="mt-2 mr-2 rounded-sm d-inline-block border my-project">
          <h6 class="text-center pt-3 pr-2 m-0">Сегодня</h6>
          <TaskListDay @edit-item="editItem" />
        </div>
        <div class="mt-2 mr-2 rounded-sm d-inline-block border my-project">
          <h6 class="text-center pt-3 pr-2 m-0">Неделя</h6>
          <TaskListMonth @edit-item="editItem" />
        </div>
      </div>
    </div>

    <Modal2 :item="item" :napravs="napravs" :projects="projects" />
  </div>
</template>

<script>
import { Modal } from 'bootstrap'
import TaskList from '@/components/general/TaskList'
import TaskListDay from '@/components/plan/TaskListDay'
import TaskListMonth from '@/components/plan/TaskListMonth'
import Modal2 from '@/components/Modal'

export default {
  components: {
    TaskList,
    TaskListDay,
    TaskListMonth,
    Modal2,
  },
  data() {
    return {
      item: null,
    }
  },
  computed: {
    napravs() {
      return this.$store.getters.napravs
    },
    projects() {
      return this.$store.getters.projects
    },
    tasks() {
      return this.$store.getters.tasks
    },
  },
  methods: {
    editItem({ id, type }) {
      this.item = this.tasks.find((item) => item.id === id)
      let myModal = new Modal(document.getElementById('exampleModal'))
      myModal.show()
    },
  },
}
</script>

<style scoped>
.my-row-project {
  height: calc(100vh - 105px) !important;
}
.my-project {
  width: 210px;
  vertical-align: top;
}

.my-no-select {
  user-select: none;
}

/* .my-opacity-05 {
  opacity: 0.5;
} */

.my-width-none {
  width: auto !important;
  max-width: none !important;
}
</style>