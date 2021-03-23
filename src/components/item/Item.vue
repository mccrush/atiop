<template>
  <div
    class="item align-self-start border rounded-1 pt-1 pb-1 ps-2 pe-2 ms-2 me-2 mb-2"
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
        ) <= 1 && item.status !== 'done'
    }"
    @dblclick.prevent="$emit('edit-item', { id: item.id, type: item.type })"
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
        v-if="item.type === 'napravs' || item.type === 'projects'"
        type="button"
        class="btn btn-sm btn-white border p-0 ps-2 pe-2 w-100"
        @click="setId"
      >
        In
      </button>
      <button
        v-if="item.type === 'tasks' && item.status === 'todo'"
        type="button"
        class="btn btn-sm btn-white border p-0 ps-2 pe-2 w-50"
        @click="changeTaskStatus('work')"
      >
        To work
      </button>
      <button
        v-if="item.type === 'tasks' && item.status === 'work'"
        type="button"
        class="btn btn-sm btn-white border p-0 ps-2 pe-2 w-50"
        @click="changeTaskStatus('done')"
      >
        Done
      </button>
      <button
        v-if="item.type === 'tasks' && item.status === 'done'"
        type="button"
        class="btn btn-sm btn-light border p-0 ps-2 pe-2 w-100"
        @click.prevent="removeItem(item.id)"
      >
        Remove
      </button>
    </div>
  </div>
</template>

<script>
import getDateNow from '@/scripts/getDateNow'

export default {
  props: ['item'],
  computed: {
    settings() {
      return this.$store.getters.settings
    }
  },
  methods: {
    changeTaskStatus(status) {
      this.$store.commit('changeTaskStatus', {
        id: this.item.id,
        type: this.item.type,
        status,
        dateStart: status === 'work' ? getDateNow : this.item.dateStart,
        dateDone: status === 'done' ? getDateNow : ''
      })

      this.$emit('update-index', { id: this.item.id, status })

      // Выполняется в компоненте List
      // const res = await this.$store.dispatch('updateItem', {
      //   id: this.item.id,
      //   type: this.item.type
      // })
      // if (res) {
      //   this.$store.commit('addMessage', 'dus')
      // } else {
      //   this.$store.commit('addMessage', 'due')
      // }
    },
    setId() {
      this.$store.commit('setNapravId', this.item.napravId)
      this.$store.commit('setProjectId', this.item.id)
      this.$store.commit('setViewType', 'projects')
    }
  }
}
</script>

<style scoped>
.item {
  width: 192px;
  line-height: 1.2;
  user-select: none;
  cursor: default;
}

.btn-white {
  background-color: #fff;
  color: #dee2e6;
}

.btn-light {
  background-color: #f8f9fa;
  color: #6c757d;
}

.btn-white:hover,
.btn-light:hover {
  background-color: #e2e6ea;
  color: #212529;
}

hr {
  background-color: #dee2e6;
}
</style>