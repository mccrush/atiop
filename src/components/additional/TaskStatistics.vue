<template>
  <table class="table table-sm text-center text-white mb-0">
    <tr>
      <td class="w-25"><span class="d-block badge bg-info">N</span></td>
      <td class="w-25"><span class="d-block badge bg-success">P</span></td>
      <td class="w-25">
        <span class="d-block badge bg-light text-dark">L</span>
      </td>
      <td class="w-25">
        <span class="d-block badge bg-warning">T-{{ tasksLength }}</span>
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
        <span class="badge bg-warning w-50">{{ tasksTodoWorkLength }}</span>
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