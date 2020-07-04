<template>
  <div class="col-2">
    <ul v-if="napravs.length" class="list-group list-group-horizontal mt-3">
      <li
        v-for="(item, index) in napravs"
        :key="'in'+index"
        class="list-group-item justify-content-between align-items-center border-0 p-0 ml-1 mr-1 cursor-pointer"
      >
        <h5
          class="text-center bg-light rounded p-2 shadow-sm elem"
          @dblclick.prevent="$emit('edit-item', {id: item.id, type: item.type})"
        >{{item.title}}</h5>
        <div class="row">
          <ListProjGeneral
            :projects="projects"
            :idnapravs="item.id"
            @edit-item="editItem"
            :color="item.color"
          />
        </div>
      </li>
    </ul>
    <p v-else>
      <small>Список пуст</small>
    </p>
  </div>
</template>

<script>
import ListProjGeneral from '@/components/general/ListProjGeneral'

export default {
  components: {
    ListProjGeneral
  },
  props: {
    napravs: {
      type: Array
    },
    projects: {
      type: Array
    }
  },
  methods: {
    editItem({ id, type }) {
      this.$emit('edit-item', { id, type })
    }
  }
}
</script>

<style scoped>
h5 {
  min-width: 150px;
}
</style>