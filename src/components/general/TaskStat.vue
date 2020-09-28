<template>
  <ul class="list-group small">
    <li
      class="list-group-item d-flex justify-content-between align-items-center p-0 pt-1 pl-2 pr-2 border-bottom-0"
    >
      Новых
      <span class="badge bg-light text-dark">{{ lengthTodo }}</span>
    </li>
    <li
      class="list-group-item d-flex justify-content-between align-items-center p-0 pt-1 pl-2 pr-2 border-bottom-0"
    >
      В работе
      <span class="badge bg-warning">{{ lengthWork }}</span>
    </li>
    <li
      class="list-group-item d-flex justify-content-between align-items-center p-1 pl-2 pr-2"
    >
      Завершенных
      <span class="badge bg-secondary">{{ lengthDone }}</span>
    </li>
    <li
      class="list-group-item d-flex justify-content-between align-items-center p-1 pl-2 pr-2"
    >
      Всего
      <span class="badge bg-light text-dark"
        ><strong>{{ lengthTasks }}</strong></span
      >
    </li>
    <!-- Новых {{ lengthTodo }}<br />
    В работе {{ lengthWork }}<br />
    Завершенных {{ lengthDone }}
    <hr />
    Всего {{ lengthTasks }} -->
  </ul>
</template>

<script>
export default {
  props: ['napravId', 'projectId'],
  computed: {
    tasks() {
      return this.$store.getters.tasks
    },
    tasksProjectId() {
      return this.tasks.filter((task) => task.projectId === this.projectId)
    },
    lengthTasks() {
      return this.tasksProjectId.length
    },
    lengthTodo() {
      return this.tasksProjectId.filter((task) => task.status === 'todo').length
    },
    lengthWork() {
      return this.tasksProjectId.filter((task) => task.status === 'work').length
    },
    lengthDone() {
      return this.tasksProjectId.filter((task) => task.status === 'done').length
    },
  },
}
</script>

<style>
</style>