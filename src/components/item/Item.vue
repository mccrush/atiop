<template>
  <div
    class="item align-self-start border rounded-1 pt-1 pb-1 ps-2 pe-2 mb-2"
    :class="{
      ' bg-white': item.status === 'todo' || item.status === 'work',
      ' bg-light': item.status === 'done',
      ' border-warning': item.status === 'work',
      'border-warning':
        Math.ceil(
          Math.abs(new Date(item.date).getTime() - new Date().getTime()) /
            (1000 * 3600 * 24)
        ) <= 1 && item.status !== 'done',
      'border-danger':
        Math.ceil(
          (new Date(item.deadline).getTime() - new Date().getTime()) /
            (1000 * 3600 * 24)
        ) <= 1 && item.status !== 'done',
    }"
  >
    <span class="small">{{ item.title }}</span>
    <hr class="m-1" />
    <span v-if="settings.showPosition" class="badge bg-dark me-1">{{
      item.position
    }}</span>
    <span v-if="settings.showNaprav" class="badge bg-info me-1">{{
      item.napravTitle || 'Без направления'
    }}</span>
    <span v-if="settings.showProject" class="badge bg-secondary me-1">{{
      item.projectTitle || 'Без проекта'
    }}</span>
    <span
      v-if="settings.showPrice && item.price"
      class="badge bg-success me-1"
      >{{ item.price }}</span
    >
    <span
      v-if="settings.showTime && item.time"
      class="badge bg-light text-dark me-1"
      >{{ item.time }} мин</span
    >
    <span class="badge bg-warning me-1" v-if="item.date && settings.showDate">{{
      new Date(item.date).toLocaleDateString()
    }}</span>
    <span
      class="badge bg-danger me-1"
      v-if="item.deadline && settings.showDeadline"
      >{{ new Date(item.deadline).toLocaleDateString() }}</span
    >
    <hr class="m-1" />
    <div class="btn-group w-100" role="group">
      <button
        v-if="item.type === 'projects'"
        type="button"
        class="btn btn-sm btn-light border p-0 ps-2 pe-2 w-100"
        @click="saveFilter"
      >
        In
      </button>
      <button
        v-if="item.type === 'tasks' && item.status === 'todo'"
        type="button"
        class="btn btn-sm btn-light border p-0 ps-2 pe-2 w-50"
        @click="changeStatus('work')"
      >
        To work
      </button>
      <button
        v-if="item.type === 'tasks'"
        type="button"
        class="btn btn-sm btn-light border p-0 ps-2 pe-2 w-50"
        @click="changeStatus('done')"
      >
        Done
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    settings() {
      return this.$store.getters.settings
    },
  },
  methods: {
    changeStatus() {},
    saveFilter() {
      this.$store.commit('setNapProj', {
        nap: this.item.napravId,
        proj: this.item.id,
      })
      this.$router.push({
        query: { nap: this.item.napravId, proj: this.item.id },
      })
    },
  },
}
</script>

<style scoped>
.item {
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