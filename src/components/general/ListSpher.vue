<template>
  <div class="col-2 p-1">
    <ul v-if="sphers.length" class="list-group list-group-flush list-group-horizontal mt-3">
      <li
        v-for="(item, index) in sphers"
        :key="'in'+index"
        class="list-group-item p-0 pl-1 pr-1 justify-content-between align-items-center cursor-pointer border-0"
      >
        <h5 class="text-center bg-light p-1 rounded-lg m-0">{{item.title}}</h5>
        <div class="row">
          <ListNaprav :napravs="napravs" :projects="projects" :idsphers="item.id" />
        </div>
      </li>
    </ul>
    <p v-else>
      <small>Список пуст</small>
    </p>
  </div>
</template>

<script>
import ListNaprav from '@/components/general/ListNaprav'

export default {
  components: {
    ListNaprav
  },
  props: {
    sphers: {
      type: Array
    },
    napravs: {
      type: Array
    },
    projects: {
      type: Array
    }
  }
}
</script>