<template>
  <div class="row mb-3">
    <div class="col-2 pe-1">
      <button class="btn btn-sm btn-light w-100" @click="showDir">H</button>
    </div>
    <div class="col-5 ps-1 pe-1">
      <button
        class="text-ellipsis btn btn-sm btn-light w-100"
        :disabled="!directionId"
        @click="showProj"
      >
        {{ getItemTitle('direction', directionId) }}
      </button>
      <div>
        <button class="btn btn-sm btn-light w-50" :disabled="!directionId">
          D
        </button>
        <button class="btn btn-sm btn-light w-50" :disabled="!directionId">
          E
        </button>
      </div>
    </div>
    <div class="col-5 ps-1">
      <button
        class="text-ellipsis btn btn-sm btn-light w-100"
        @click="showTask"
      >
        {{ getItemTitle('project', projectId) }}
      </button>
      <div>
        <button class="btn btn-sm btn-light w-50" :disabled="!projectId">
          D
        </button>
        <button class="btn btn-sm btn-light w-50" :disabled="!projectId">
          E
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    directionId() {
      return this.$store.getters.directionId
    },
    projectId() {
      return this.$store.getters.projectId
    }
  },
  methods: {
    showDir() {
      this.$store.commit('setItemId', { type: 'direction', item: '' })
      this.$store.commit('setItemId', { type: 'project', item: '' })
      this.$store.commit('setItemId', { type: 'task', item: '' })
    },
    showProj() {
      this.$store.commit('setItemId', { type: 'project', item: '' })
      this.$store.commit('setItemId', { type: 'task', item: '' })
    },
    showTask() {
      this.$store.commit('setItemId', { type: 'task', item: '' })
    },
    getItemTitle(type, id) {
      if (id) {
        return this.$store.getters[type].find(item => item.id === id).title
      }
      return '-'
    }
  }
}
</script>