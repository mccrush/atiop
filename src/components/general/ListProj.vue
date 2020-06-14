<template>
  <div class="col-2">
    <ul v-if="displayProj.length" class="list-group list-group-horizontal mt-2">
      <li
        v-for="(item, index) in displayProj"
        :key="'in'+index"
        class="list-group-item justify-content-between align-items-center border-0 p-0 ml-1 mr-1 cursor-pointer"
      >
        <h6
          class="text-center bg-light rounded-lg p-2 elem"
          :style="'background:'+color+' !important'"
        >
          <small
            @dblclick.prevent="$emit('edit-item', {id: item.id, type: item.type})"
          >{{item.title}}</small>
        </h6>
      </li>
    </ul>
    <!-- <p v-else class="li">
      <small>Список пуст</small>
    </p>-->
  </div>
</template>

<script>
export default {
  props: {
    projects: {
      type: Array
    },
    idnapravs: {
      type: String
    },
    color: {
      type: String
    }
  },
  computed: {
    displayProj() {
      return this.projects.filter(item => item.idnapravs === this.idnapravs)
    }
  }
}
</script>

<style scoped>
h6 {
  min-width: 150px;
}
</style>