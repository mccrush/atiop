<template>
  <div
    class="task align-self-start border rounded-sm pt-1 pb-1 pl-2 pr-2 m-2"
    :class="{' bg-light': task.status === 'done', ' border border-warning': task.status === 'work'}"
    @dblclick.prevent="$emit('edit-item', {id: task.id, type: task.type})"
  >
    <span class="small">{{task.title}}</span>
    <hr class="m-1" />
    <span class="badge bg-dark mr-1">{{task.position}}</span>
    <span class="badge bg-info mr-1">{{task.napravTitle}}</span>
    <span class="badge bg-secondary mr-1">{{task.projectTitle}}</span>
    <span
      class="badge bg-warning mr-1"
      v-if="task.date"
    >{{new Date(task.date).toLocaleDateString()}}</span>
    <span
      class="badge bg-danger mr-1"
      v-if="task.deadline"
    >{{new Date(task.deadline).toLocaleDateString()}}</span>
    <hr class="m-1" />
    <button class="btn btn-sm btn-light border" @click="changeStatus">Done</button>
  </div>
</template>

<script>
export default {
  props: ['task'],
  methods: {
    changeStatus() {
      this.$store.dispatch('changeStatus', {
        id: this.task.id,
        type: this.task.type,
        status: 'done',
      })
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
</style>