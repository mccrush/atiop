<template>
  <div class="row overflow-auto row-naprav">
    <ul
      v-if="napravs.length"
      class="list-group list-group-horizontal mt-3 width-none"
    >
      <li
        v-for="(item, index) in napravs"
        :key="'in' + index"
        class="list-group-item justify-content-between align-items-center border-0 p-0 ms-1 me-1 cursor-pointer d-inline-block naprav"
      >
        <h5
          class="text-center bg-light rounded-1 p-2 my-no-select"
          @dblclick.prevent="
            $emit('edit-item', { id: item.id, type: item.type })
          "
        >
          {{ item.title }}
        </h5>
        <div class="row">
          <ListProjGeneral
            :projects="projects"
            :napravId="item.id"
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
    ListProjGeneral,
  },
  props: ['napravs', 'projects'],
  methods: {
    editItem({ id, type }) {
      this.$emit('edit-item', { id, type })
    },
  },
}
</script>

<style scoped>
h5 {
  min-width: 150px;
}

.row-naprav {
  height: calc(100vh - 105px) !important;
}
.naprav {
  vertical-align: top;
}

.width-none {
  width: auto !important;
  max-width: none !important;
}
</style>