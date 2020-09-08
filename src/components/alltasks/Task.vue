<template>
  <div
    class="task align-self-start border rounded-sm pt-1 pb-1 pl-2 pr-2 m-2"
    :class="{' bg-light': task.status === 'done', ' border border-warning': task.status === 'work'}"
    @dblclick.prevent="$emit('edit-item', {id: task.id, type: task.type})"
  >
    <span class="small">{{task.title}}</span>
    <hr class="m-1" />
    <span class="badge bg-info mr-1">{{task.idnapravs}}</span>
    <span class="badge bg-secondary mr-1">{{task.idprojects}}</span>
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
  user-select: none;
  cursor: default;
}
</style>