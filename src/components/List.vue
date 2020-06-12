<template>
  <div class="col-2">
    <h5 class="text-center">{{type}}</h5>
    <form @submit.prevent="addItem">
      <input type="text" class="form-control" v-model="title" />
      <button type="submit" class="btn btn-light">Add</button>
    </form>
    <ul v-if="list.length" class="list-group">
      <li
        v-for="(item, index) in list"
        :key="'in'+index"
        class="list-group-item"
      >{{index + 1}} {{item.title}}</li>
    </ul>
    <p v-else>Значений нет</p>
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
    }
  },
  data() {
    return {
      title: ''
    }
  },
  addItem() {
    const item = {
      title: this.title.trim(),
      id: Date.now().toString,
      type: this.type,
      idSpher: '',
      idNaprav: '',
      idProj: '',
      idEtap: ''
    }
    this.title = ''
    this.$emit('add-item', item)
  }
}
</script>