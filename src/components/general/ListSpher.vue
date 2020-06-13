<template>
  <div class="col-2">
    <ul v-if="sphers.length" class="list-group list-group-horizontal mt-3">
      <li
        v-for="(item, index) in sphers"
        :key="'in'+index"
        class="list-group-item p-2 pl-3 justify-content-between align-items-center cursor-pointer"
      >
        <span>{{item.title}}</span>
        <div class="row">
          <ListNaprav :napravs="napravs" :projects="projects" :idsphers="item.id" />
        </div>
      </li>
    </ul>
    <p v-else>Значений нет</p>
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