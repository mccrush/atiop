<template>
  <div class>
    <ul
      v-if="sortTasks.length"
      class="list-grou m-0 p-2"
      @drop="dropItem($event)"
      @dragover.prevent
      @dragenter.self="$event.target.classList.add('bg-light', 'pt-4')"
      @dragleave.self="$event.target.classList.remove('bg-light', 'pt-4')"
    >
      <li
        v-for="(item, index) in sortTasks"
        :key="'in'+index"
        class="list-group-item d-flex justify-content-between align-items-center cursor-pointer border rounded mb-2 p-2 pl-2"
        :class="{' bg-light': item.status === 'done'}"
        draggable
        @dblclick.prevent="$emit('edit-item', {id: item.id, type: item.type})"
        @dragstart="dragItem($event, item.id)"
        @dragenter.prevent
      >
        <small
          class="align-self-center elem"
        >{{settings.sortBy === 'position' ? index + 1 : ''}} {{item.title}}</small>
        <div
          class="align-self-start rounded-sm position-absolute"
          :class="{' deadline': Math.ceil(Math.abs(new Date(item.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))  <= 2 && item.status != 'done'}"
        ></div>
        <div
          class="align-self-start rounded-sm position-absolute"
          :class="{' work': item.status === 'work' && status != 'work'}"
        ></div>
        <div
          v-if="item.status != 'done'"
          @click.prevent="changeStatusToDone({id: item.id, type: item.type})"
          class="to-arhiv position-absolute bg-light"
        ></div>
      </li>
    </ul>
    <form v-if="!hideform" @submit.prevent="addItem" class="mt-0 mb-2 pl-2 pr-2">
      <input
        type="text"
        class="form-control form-control-sm border-0 bg-light"
        :class="{'border-danger': error}"
        v-model="title"
        @focus="error = false"
      />
    </form>
  </div>
</template>

<script>
export default {
  props: {
    tasks: {
      type: Array
    },
    idnapravs: {
      type: String
    },
    idprojects: {
      type: String
    },
    hideform: {},
    status: {}
  },
  data() {
    return {
      title: '',
      error: false
    }
  },
  computed: {
    displayTasks() {
      return this.tasks.filter(item => item.idprojects === this.idprojects)
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
    }
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
      e.target.classList.remove('bg-light', 'pt-4')
      const id = e.dataTransfer.getData('task-index')
      this.$store.dispatch('changeStatus', {
        id,
        type: 'tasks',
        status: this.status
      })
    },
    addItem() {
      if (this.title.trim()) {
        const item = {
          title: this.title.trim(),
          id: Date.now().toString(),
          type: 'tasks',
          idnapravs: this.idnapravs,
          idprojects: this.idprojects,
          status: 'todo',
          position: this.tasks.length + 1, // По умолчанию в конец списка
          color: '', // У задач нет цвета
          date: this.getDateNow()
        }
        this.title = ''
        this.$store.dispatch('addItem', item)
      } else {
        this.error = true
      }
    },
    changeStatusToDone({ id, type }) {
      this.$store.dispatch('changeStatus', { id, type, status: 'done' })
    },
    getDateNow() {
      return (
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1 > 9
          ? new Date().getMonth() + 1
          : '0' + (new Date().getMonth() + 1)) +
        '-' +
        (new Date().getDate() + 3 > 9
          ? new Date().getDate() + 3
          : '0' + (new Date().getDate() + 3)) +
        'T' +
        (new Date().getHours() > 9
          ? new Date().getHours()
          : '0' + new Date().getHours()) +
        ':' +
        (new Date().getMinutes() > 9
          ? new Date().getMinutes()
          : '0' + new Date().getMinutes())
      )
    }
  }
}
</script>

<style scoped>
.deadline {
  width: 8px;
  height: 8px;
  background: #dc3545;
  top: 4px;
  right: 4px;
  z-index: 1;
}

.work {
  width: 8px;
  height: 8px;
  background: #007bff;
  top: 4px;
  right: 4px;
  z-index: 2;
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
  background: url('/img/task/box_24px.png') center center no-repeat;
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