<template>
  <div class="w150">
    <ul v-if="displayTasks.length" class="list-group mt-1">
      <li
        v-for="(item, index) in displayTasks"
        :key="'in'+index"
        class="list-group-item justify-content-between align-items-center cursor-pointer p-1 pl-2"
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
          idetaps: this.idetaps
        }
        this.title = ''
        //this.$emit('add-item', item)
      } else {
        this.error = true
      }
    }
  }
}
</script>

<style scoped>
/* li,
p.li {
  width: 150px;
  min-width: 150px;
} */

.w150 {
  width: 150px;
}
</style>