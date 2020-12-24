<template>
  <div
    class="task align-self-start border rounded-sm pt-1 pb-1 ps-2 pe-2 m-2"
    :class="{
      ' bg-white': task.status === 'todo' || task.status === 'work',
      ' bg-light': task.status === 'done',
      ' border-warning': task.status === 'work',
      'border-warning':
        Math.ceil(
          Math.abs(new Date(task.date).getTime() - new Date().getTime()) /
            (1000 * 3600 * 24)
        ) <= 1 && task.status !== 'done',
      'border-danger':
        Math.ceil(
          (new Date(task.deadline).getTime() - new Date().getTime()) /
            (1000 * 3600 * 24)
        ) <= 1 && task.status !== 'done',
    }"
    @dblclick.prevent="$emit('edit-item', { id: task.id, type: task.type })"
  >
    <span class="small">{{ task.title }}</span>
    <hr class="m-1" />
    <span v-if="settings.showPosition" class="badge bg-light text-dark mr-1">{{
      task.position
    }}</span>
    <span
      v-if="settings.showNaprav"
      @click="
        filterBadget({ filterType: 'napravId', filterValue: task.napravId })
      "
      class="badge bg-info mr-1"
      >{{ task.napravTitle || 'Без направления' }}</span
    >
    <span
      v-if="settings.showProject"
      @click="
        filterBadget({ filterType: 'projectId', filterValue: task.projectId })
      "
      class="badge bg-secondary mr-1"
      >{{ task.projectTitle || 'Без проекта' }}</span
    >
    <span
      v-if="settings.showPrice && task.price"
      class="badge bg-success mr-1"
      >{{ task.price }}</span
    >
    <span class="badge bg-warning mr-1" v-if="task.date && settings.showDate">{{
      new Date(task.date).toLocaleDateString()
    }}</span>
    <span
      class="badge bg-danger mr-1"
      v-if="task.deadline && settings.showDeadline"
      >{{ new Date(task.deadline).toLocaleDateString() }}</span
    >
    <!-- <span class="badge bg-dark mr-1"
      >{{ new Date(task.dateCreate).toLocaleDateString() }} -
      {{ new Date(task.dateStart).toLocaleDateString() }} -
      {{ new Date(task.dateDone).toLocaleDateString() }}</span
    > -->
    <hr class="m-1" />
    <div
      v-if="task.status !== 'done'"
      class="btn-group w-100"
      role="group"
      aria-label="Basic example"
    >
      <button
        v-if="task.status === 'todo'"
        type="button"
        class="btn btn-sm btn-light border p-0 pl-2 pr-2 w-50"
        @click="changeStatus('work')"
      >
        To work
      </button>
      <button
        type="button"
        class="btn btn-sm btn-light border p-0 pl-2 pr-2 w-50"
        @click="changeStatus('done')"
      >
        Done
      </button>
    </div>
  </div>
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
  },
}
</script>

<style scoped>
.task {
  width: 192px;
  line-height: 1.2;
  user-select: none;
  cursor: default;
}

.btn-light {
  background-color: #fff;
  color: #dee2e6;
}

.btn-light:hover {
  background-color: #e2e6ea;
  color: #212529;
}

hr {
  background-color: #dee2e6;
}
</style>