<template>
  <div class="w150">
    <ul v-if="displayTasks.length" class="list-group mt-1">
      <li
        v-for="(item, index) in displayTasks"
        :key="'in'+index"
        class="list-group-item justify-content-between align-items-center cursor-pointer p-1 pl-2"
        @dblclick.prevent="$emit('edit-item', {id: item.id, type: item.type})"
      >
        <small class="elem">{{item.title}}</small>
      </li>
    </ul>
    <!-- <p v-else class="li">
      <small>Список пуст</small>
    </p>-->
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
    <div v-if="arhivsTask.length">
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
    idprojects: {
      type: String
    },
    idsphers: {
      type: String
    },
    idnapravs: {
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
    }
  },
  methods: {
    addItem() {
      if (this.title.trim()) {
        const item = {
          title: this.title.trim(),
          id: Date.now().toString(),
          type: 'tasks',
          idsphers: this.idsphers,
          idnapravs: this.idnapravs,
          idprojects: this.idprojects,
          active: true,
          position: 1, // По умолчанию в начало списка
          color: '#ffffff', // Должен назначаться родителем
          date: this.getDateNow()
        }
        this.title = ''
        this.$store.dispatch('addItem', item)
      } else {
        this.error = true
      }
    },
    getDateNow() {
      return (
        new Date().getFullYear() +
        '-' +
        (new Date().getMonth() + 1 > 9
          ? new Date().getMonth() + 1
          : '0' + (new Date().getMonth() + 1)) +
        '-' +
        (new Date().getDate() > 9
          ? new Date().getDate()
          : '0' + new Date().getDate()) +
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
.w150 {
  width: 150px;
}
</style>