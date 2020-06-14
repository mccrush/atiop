<template>
  <div class="col-2 p-1">
    <h5 class="text-center mt-2">{{type}}</h5>
    <form @submit.prevent="addItem">
      <input
        type="text"
        class="form-control form-control-sm"
        :class="{'border-danger': error}"
        v-model="title"
        @focus="error = false"
      />
      <button type="submit" class="btn btn-sm btn-block btn-light">Add</button>
    </form>
    <ul v-if="list.length" class="list-group mt-3">
      <li
        v-for="(item, index) in list"
        :key="'in'+index"
        class="list-group-item p-2 pl-3 d-flex justify-content-between align-items-center cursor-pointer"
        @click="$emit('select-item', {id: item.id, type: item.type})"
        ref="itemli"
      >
        <small>{{index + 1}} {{item.title}}</small>
        <button
          class="btn btn-sm btn-light p-0 pl-2 pr-2"
          @click.stop="$emit('remove-item', {id: item.id, type: item.type})"
        >&times;</button>
      </li>
    </ul>
    <p v-else>
      <small>Список пуст</small>
    </p>
  </div>
</template>

<script>
//import getDateNow from '@/scripts/getDateNow'

export default {
  props: {
    list: {
      type: Array
    },
    type: {
      type: String
    },
    idsphers: {
      defauit: ''
    },
    idnapravs: {
      defauit: ''
    },
    idprojects: {
      defauit: ''
    }
  },
  data() {
    return {
      title: '',
      error: false
    }
  },
  methods: {
    addItem() {
      if (this.title.trim()) {
        const item = {
          title: this.title.trim(),
          id: Date.now().toString(),
          type: this.type,
          idsphers: this.idsphers,
          idnapravs: this.idnapravs,
          idprojects: this.idprojects,
          status: 'active', // done, arhive
          position: 1, // По умолчанию в начало списка
          color: '#f2f2f2', // Должен назначаться родителем
          date: this.getDateNow()
        }
        this.title = ''
        this.$emit('add-item', item)
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
.cursor-pointer {
  cursor: pointer;
}
</style>