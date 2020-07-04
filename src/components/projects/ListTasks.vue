<template>
  <div class>
    <ul
      v-if="sortTasks.length"
      class="list-group mt-1 p-2"
      @drop="moveTask($event)"
      @dragover.prevent
      @dragenter.self="$event.target.classList.add('bg-light')"
      @dragleave.self="$event.target.classList.remove('bg-light')"
    >
      <li
        v-for="(item, index) in sortTasks"
        :key="'in'+index"
        class="list-group-item d-flex justify-content-between align-items-center cursor-pointer p-2 pl-2"
        draggable
        @dblclick.prevent="$emit('edit-item', {id: item.id, type: item.type})"
        @dragstart="picupTask($event, item.id)"
        @dragenter.prevent
      >
        <small
          class="align-self-center elem"
        >{{settings.sortBy === 'position' ? index + 1 : ''}} {{item.title}}</small>
        <div
          class="align-self-start rounded-sm position-absolute"
          :class="{' deadline': Math.ceil(Math.abs(new Date(item.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))  <= 2}"
        ></div>
        <div
          class="align-self-start rounded-sm position-absolute"
          :class="{' work': item.status === 'work'}"
        ></div>
        <div
          @click.prevent="changeStatusToDone({id: item.id, type: item.type})"
          class="to-arhiv position-absolute bg-light"
        ></div>
      </li>
    </ul>
    <form v-if="!hideform" @submit.prevent="addItem" class="mt-1">
      <input
        type="text"
        class="form-control form-control-sm"
        :class="{'border-danger': error}"
        v-model="title"
        @focus="error = false"
      />
      <!-- <button type="submit" class="btn btn-sm btn-block btn-light">Add</button> -->
    </form>

    <div v-if="settings.showArhived && arhivsTask.length">
      <hr class="m-2" />
      <ul class="list-group mt-1">
        <li
          v-for="(item, index) in arhivsTask"
          :key="'in'+index"
          class="list-group-item justify-content-between align-items-center cursor-pointer p-1 pl-2 bg-light"
          @dblclick.prevent="$emit('edit-item', {id: item.id, type: item.type})"
        >
          <small class="elem">{{item.title}}</small>
        </li>
      </ul>
    </div>
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
      return this.tasks.filter(
        item =>
          item.idprojects === this.idprojects &&
          (item.status === 'todo' || item.status === 'work')
      )
    },
    arhivsTask() {
      return this.tasks.filter(
        item => item.idprojects === this.idprojects && item.status === 'done'
      )
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
    picupTask(e, id) {
      e.dataTransfer.effectAllowed = 'move'
      e.dataTransfer.dropEffect = 'move'
      e.dataTransfer.setData('task-index', id)
    },
    moveTask(e) {
      e.target.classList.remove('bg-light')
      const id = e.dataTransfer.getData('task-index')
      this.$store.dispatch('changeStatus', {
        id,
        type: 'tasks',
        status: this.status
      })
    },
    // draDrop() {
    //   const dragEl = document.querySelector('.dragelem')
    //   const dragZona = document.querySelector('.dragzona')

    //   let coordX, coordY

    //   dragEl.addEventListener('dragstart', e => {
    //     console.log('dragstart')
    //     e.dataTransfer.setData('text/html', 'dragstart')
    //     coordX = e.offsetX
    //     coordY = e.offsetY
    //   })

    //   dragZona.addEventListener('dragenter', e => {
    //     console.log('Зашел на список')
    //     dragZona.style.border = '1px solid red'
    //   })

    //   dragZona.addEventListener('dragleave', e => {
    //     console.log('Ушел со списка')
    //     dragZona.style.border = 'none'
    //   })

    //   dragZona.addEventListener('dragover', e => {
    //     e.preventDefault()
    //   })

    //   dragZona.addEventListener('drop', e => {
    //     console.log('Опущен над списком')
    //     dragZona.style.border = 'none'
    //   })
    // },
    // drag(event) {
    //   let elem = event.target
    //   elem.style.cursor = 'grabbing'

    //   let shiftX = event.clientX - elem.getBoundingClientRect().left
    //   let shiftY = event.clientY - elem.getBoundingClientRect().top

    //   elem.style.position = 'absolute'
    //   elem.style.zIndex = 1000
    //   document.body.append(elem)

    //   moveItem(event.pageX, event.pageY)

    //   function moveItem(pageX, pageY) {
    //     elem.style.left = pageX - shiftX + 'px'
    //     elem.style.top = pageY - shiftY + 'px'
    //   }

    //   function onMouseMove(event) {
    //     moveItem(event.pageX, event.pageY)
    //   }

    //   document.addEventListener('mousemove', onMouseMove)

    //   elem.onmouseup = function() {
    //     document.removeEventListener('mousemove', onMouseMove)
    //     elem.onmouseup = null
    //     elem.style.cursor = 'default'
    //   }
    // },
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
.w220 {
  width: 220px;
}

.btn-deleted {
  position: absolute;
  right: 0;
  top: 0;
}

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
  opacity: 0.7;
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