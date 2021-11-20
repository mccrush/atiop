<template>
  <table class="table table-sm text-center text-white mb-0">
    <tr>
      <td class="w-25">
        <span
          class="bg-napravs d-block badge"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          data-bs-html="true"
          title="Количество<br>направлений"
          >N</span
        >
      </td>
      <td class="w-25">
        <span
          class="bg-projects d-block badge"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          data-bs-html="true"
          title="Количество<br>проектов"
          >P</span
        >
      </td>
      <td class="w-25">
        <span
          class="bg-lists d-block badge"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          data-bs-html="true"
          title="Количество<br>списков"
          >L</span
        >
      </td>
      <td class="w-25">
        <span
          class="bg-tasks d-block badge"
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          data-bs-html="true"
          title="Количество<br>задач"
          >T-{{ tasksLength }}</span
        >
      </td>
    </tr>
    <tr>
      <td>
        <span class="d-block border badge bg-light text-dark">{{
          napravsLength
        }}</span>
      </td>
      <td>
        <span class="d-block border badge bg-light text-dark">{{
          projectsLength
        }}</span>
      </td>
      <td>
        <span class="d-block border badge bg-light text-dark">{{
          listsLength
        }}</span>
      </td>
      <td>
        <span class="bg-tasks badge w-50">{{ tasksTodoWorkLength }}</span>
        <span class="border badge bg-light text-dark w-50">{{
          tasksDoneLength
        }}</span>
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  computed: {
    napravsLength() {
      return this.$store.getters.napravsLength
    },
    projectsLength() {
      return this.$store.getters.projectsLength
    },
    listsLength() {
      return this.$store.getters.listsLength
    },
    tasksLength() {
      return this.$store.getters.tasksLength
    },
    tasksTodoWorkLength() {
      return this.$store.getters.tasksTodoWorkLength
    },
    tasksDoneLength() {
      return this.$store.getters.tasksDoneLength
    }
  }
}
</script>

<style scoped>
.bg-napravs {
  background-color: #206a5d;
}
.bg-projects {
  background-color: #81b214;
}
.bg-lists {
  background-color: #f58634;
}
.bg-tasks {
  background-color: #ffcc29;
}
</style>