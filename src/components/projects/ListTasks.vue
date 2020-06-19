<template>
  <div class="w170">
    <ul v-if="sortTasks.length" class="list-group mt-1">
      <li
        v-for="(item, index) in sortTasks"
        :key="'in'+index"
        class="list-group-item d-flex justify-content-between align-items-center cursor-pointer p-2 pl-2"
        @dblclick.prevent="$emit('edit-item', {id: item.id, type: item.type})"
      >
        <small
          class="align-self-center elem"
        >{{settings.sortBy === 'position' ? index + 1 : ''}} {{item.title}}</small>
        <div
          class="align-self-start rounded-sm position-absolute"
          :class="{' deadline': Math.ceil(Math.abs(new Date(item.date).getTime() - new Date().getTime()) / (1000 * 3600 * 24))  <= 2}"
        ></div>
        <!-- <button
          class="btn btn-sm btn-light p-0 pl-2 pr-2 align-self-start btn-deleted"
          @click.stop="removeItem({id: item.id, type: item.type})"
        >&times;</button>-->
      </li>
    </ul>
    <form @submit.prevent="addItem" class="mt-1">
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
    }
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
        item => item.idprojects === this.idprojects && item.active
      )
    },
    arhivsTask() {
      return this.tasks.filter(
        item => item.idprojects === this.idprojects && !item.active
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
    addItem() {
      if (this.title.trim()) {
        const item = {
          title: this.title.trim(),
          id: Date.now().toString(),
          type: 'tasks',
          idnapravs: this.idnapravs,
          idprojects: this.idprojects,
          active: true,
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
    removeItem({ id, type }) {
      this.$store.dispatch('removeItem', { id, type })
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
          : '0' + new Date().getDate() + 3) +
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
.w170 {
  width: 170px;
}

.btn-deleted {
  position: absolute;
  right: 0;
  top: 0;
}

.deadline {
  width: 8px;
  height: 8px;
  /* background: #f9c6c9ff; */
  background: #fb7d86;
  top: 4px;
  right: 4px;
  opacity: 0.8;
}

li.list-group-item > .btn {
  display: none;
}

li.list-group-item:hover > .btn {
  display: block;
}
</style>