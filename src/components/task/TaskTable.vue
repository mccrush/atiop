<template>
  <li
    class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
  >
    <span>{{ task.title }}</span>
    <span class="w-25">
      <div
        v-if="task.status !== 'done'"
        class="btn-group w-100"
        role="group"
        aria-label="Basic example"
      >
        <button
          v-if="task.status === 'todo'"
          type="button"
          class="btn btn-sm btn-light border p-0 ps-2 pe-2 w-50"
          @click="changeStatus('work')"
        >
          To work
        </button>
        <button
          type="button"
          class="btn btn-sm btn-light border p-0 ps-2 pe-2 w-50"
          @click="changeStatus('done')"
        >
          Done
        </button>
      </div>
      <div v-else>
        <button
          type="button"
          class="btn btn-sm btn-light border p-0 ps-2 pe-2 w-100"
          @click.prevent="
            removeItem({
              id: task.id,
              type: task.type,
              idproj: task.projectId,
            })
          "
        >
          Remove
        </button>
      </div></span
    >
  </li>
</template>

<script>
import getDateNow from '@/scripts/getDateNow'

export default {
  props: ['task', 'settings'],
  methods: {
    changeStatus(status) {
      if (status === 'work') {
        this.$store.dispatch('changeStatus', {
          id: this.task.id,
          type: this.task.type,
          status,
          dateStart: getDateNow,
          dateDone: '',
        })
      } else if (status === 'done') {
        this.$store.dispatch('changeStatus', {
          id: this.task.id,
          type: this.task.type,
          status,
          dateStart: this.task.dateStart,
          dateDone: getDateNow,
        })
      } else {
        console.log('Task: Ошибка при смене статуса')
      }
    },
    filterBadget({ filterType, filterValue }) {
      this.$store.commit('updateFilter', { filterType, filterValue })
    },
    removeItem({ id, type, idproj }) {
      // Сделать асинхронной и выводить сообщения об ошибках
      this.$store.dispatch('removeItem', { id, type, idproj })
    },
  },
}
</script>

<style scoped>
</style>