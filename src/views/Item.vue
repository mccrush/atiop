<template>
  <div>
    <!-- Filter -->
    <div class="row border-bottom p-0">
      <div class="col-1">
        <select name="naprav">
          <option value="all">Все</option>
        </select>
      </div>
      <div class="col-1">
        <select name="project">
          <option value="all">Все</option>
        </select>
      </div>
    </div>
    <!-- Lists -->
    <div class="row overflow-auto my-row-project">
      <List v-for="list in lists" :key="'list'+list.id" :list="list">
    </div>
  </div>
</template>

<script>
import List from '@/components/item/List'

export default {
  components: {
    List,
  },
  data() {
    return {
      lists: [
        { id: 1, title: 'list 1' },
        { id: 2, title: 'list 2' },
        { id: 3, title: 'list 3' },
        { id: 4, title: 'list 4' },
      ],
    }
  },
}
</script>

<style scoped>
.my-row-project {
  height: calc(100vh - 108px) !important;
  background-color: coral;
}
</style>