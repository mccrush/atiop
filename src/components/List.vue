<template>
  <div class="col-3 col-lg-2 p-1">
    <h5 class="text-center mt-2">{{type === 'napravs' ? 'Направления' : 'Проекты'}}</h5>
    <ul v-if="list.length" class="list-group mt-1">
      <li
        v-for="(item, index) in list"
        :key="'in'+index"
        class="list-group-item p-2 pl-3 d-flex justify-content-between align-items-center cursor-pointer"
        :style="{'background': item.color ? item.color+'!important' : '#f8f9fa!important'}"
        :class="{'bor-left-red': new Date(item.date) - new Date() < 2}"
        @click="$emit('select-item', {id: item.id, type: item.type})"
      >
        <small>{{index + 1}} {{item.title}}</small>
        <button
          class="btn btn-sm btn-light p-0 pl-2 pr-2"
          @click.stop="removeItem({id: item.id, type: item.type})"
        >&times;</button>
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
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    },
    type: {
      type: String
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
      // Сделать асинхронной и выводить сообщения об ошибках
      if (this.title.trim()) {
        const item = {
          title: this.title.trim(),
          id: Date.now().toString(),
          type: this.type,
          idnapravs: this.idnapravs || '',
          idprojects: this.idprojects || '',
          active: true,
          position: this.list.length + 1, // По умолчанию в конец списка
          color: '',
          date: this.getDateNow()
        }
        this.title = ''
        this.$store.dispatch('addItem', item)
      } else {
        this.error = true
      }
    },
    removeItem({ id, type }) {
      // Сделать асинхронной и выводить сообщения об ошибках
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
.cursor-pointer {
  cursor: pointer;
}

.bor-left-red {
  background: #f5c6cb;
}
</style>