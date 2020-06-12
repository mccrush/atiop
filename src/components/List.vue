<template>
  <div class="col-2">
    <h5 class="text-center">{{type}}</h5>
    <form @submit.prevent="addItem">
      <input type="text" class="form-control form-control-sm" v-model="title" />
      <button type="submit" class="btn btn-sm btn-block btn-light">Add</button>
    </form>
    <ul v-if="list.length" class="list-group mt-3">
      <li
        v-for="(item, index) in list"
        :key="'in'+index"
        class="list-group-item p-2 pl-3 d-flex justify-content-between align-items-center"
      >
        <small>{{index + 1}} {{item.title}}</small>
        <button
          class="btn btn-sm btn-light p-0 pl-2 pr-2"
          @click="$emit('remove-todo', {id: item.id, type: item.type})"
        >&times;</button>
      </li>
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
  methods: {
    addItem() {
      const item = {
        title: this.title.trim(),
        id: Date.now().toString(),
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
}
</script>