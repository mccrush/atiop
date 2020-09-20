<template>
  <div class>
    <ul
      class="list-grou m-0 pl-2 pr-2"
      @drop.prevent="dropItem($event)"
      @dragover.prevent
      @dragenter.self="$event.target.classList.add('bg-light')"
      @dragleave.self="$event.target.classList.remove('bg-light')"
    >
      <li
        v-for="(item, index) in sortTasks"
        :key="'in'+index"
        class="list-group-item border rounded-sm mb-2 p-2 task"
        :class="{' bg-light': item.status === 'done', 'border-warning': item.status === 'work' && status != 'work'}"
        draggable
        @dblclick.prevent="$emit('edit-item', {id: item.id, type: item.type})"
        @dragstart="dragItem($event, item.id)"
        @dragenter.prevent
      >
        <small
          class="align-self-center elem"
        >{{settings.sortBy === 'position' ? index + 1 : ''}} {{item.title}}</small>
        <div
          class="align-self-start position-absolute rounded-left h-100 label"
          :class="{' bg-danger': Math.ceil(Math.abs(new Date(item.deadline).getTime() - new Date().getTime()) / (1000 * 3600 * 24))  <= 2 && item.status != 'done'}"
        ></div>
        <hr class="m-1" />
        <hr class="m-1" />
        <button
          class="btn btn-sm btn-light border p-0 pl-2 pr-2"
          @click="changeStatusToDone({id: item.id, type: item.type})"
        >Done</button>
      </li>
    </ul>
    <form v-if="!hideform" @submit.prevent="addItem" class="mt-0 mb-2 pl-2 pr-2">
      <input
        type="text"
        class="form-control form-control-sm border-0 bg-light"
        :class="{'border-danger': error}"
        placeholder="Добавить задачу"
        v-model.trim="title"
        @focus="error = false"
      />
    </form>
  </div>
</template>

<script>
import createTask from '@/scripts/createTask'
import getDateNow from '@/scripts/getDateNow'

export default {
  props: [
    'tasks',
    'napravId',
    'projectId',
    'napravs',
    'projects',
    'hideform',
    'status',
  ],
  data() {
    return {
      title: '',
      error: false,
    }
  },
  computed: {
    displayTasks() {
      return this.tasks.filter((item) => item.projectId === this.projectId)
    },
    sortTasks() {
      return this.displayTasks.sort((a, b) => {
        if (this.settings.sortBy === 'position') {
          return a.position - b.position
        } else if (this.settings.sortBy === 'date') {
          return new Date(a.date) - new Date(b.date)
        }
      })
    },
    settings() {
      return this.$store.getters.settings
    },
  },
  methods: {
    dragItem(e, id) {
      e.dataTransfer.setData('text/html', 'dragstart')
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.target.style = 'cursor: draggable'
      e.dataTransfer.setData('task-index', id)
    },
    dropItem(e) {
      //console.log('e.target.tag:', e)
      if (e.localName === 'ul') {
        e.target.classList.remove('bg-light')
      }
      const id = e.dataTransfer.getData('task-index')
      this.$store.dispatch('changeStatus', {
        id,
        type: 'tasks',
        status: this.status,
      })
    },
    addItem() {
      if (this.title) {
        const napravTitle = this.napravs.find(
          (item) => item.id === this.napravId
        ).title
        const projectTitle = this.projects.find(
          (item) => item.id === this.projectId
        ).title
        const type = 'tasks'
        const item = createTask(
          this.title,
          type,
          this.napravId,
          this.projectId,
          this.tasks.length,
          napravTitle,
          projectTitle
        )
        this.title = ''
        this.$store.dispatch('addItem', item)
      } else {
        this.error = true
      }
    },
    changeStatusToDone({ id, type }) {
      this.$store.dispatch('changeStatus', {
        id,
        type,
        status: 'done',
        dateDone: getDateNow,
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

.label {
  width: 2px;
  top: 0;
  left: 0;
}

.deadline {
  background: #dc3545;
  z-index: 1;
}

.minheight-42 {
  min-height: 42px;
}

.to-arhiv {
  top: 2px;
  right: 2px;
  width: 24px;
  height: 24px;
  border-radius: 0.25rem;
  cursor: pointer;
  opacity: 0.4;
  transition: 0.5s;
  z-index: 3;
}

.to-arhiv:hover {
  opacity: 1;
}

li.list-group-item > .to-arhiv {
  display: none;
}

li.list-group-item:hover > .to-arhiv {
  display: block;
}
</style>