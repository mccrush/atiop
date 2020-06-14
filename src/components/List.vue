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
          idprojects: this.idprojects
        }
        this.title = ''
        this.$emit('add-item', item)
      } else {
        this.error = true
      }
    }
  }
}
</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
</style>