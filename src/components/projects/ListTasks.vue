<template>
  <div class="w150">
    <ul v-if="displayTasks.length" class="list-group mt-1">
      <li
        v-for="(item, index) in displayTasks"
        :key="'in'+index"
        class="list-group-item justify-content-between align-items-center cursor-pointer p-1 pl-2"
        @dblclick="$emit('edit-item', {id: item.id, type: item.type})"
      >
        <small>{{item.title}}</small>
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
      return this.tasks.filter(item => item.idprojects === this.idprojects)
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
          status: 'active', // done, arhive
          position: 1, // По умолчанию в начало списка
          color: '#f2f2f2', // Должен назначаться родителем
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