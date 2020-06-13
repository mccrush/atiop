<template>
  <div class="col-2">
    <ul v-if="displayNaprav.length" class="list-group list-group-flush list-group-horizontal mt-3">
      <li
        v-for="(item, index) in displayNaprav"
        :key="'in'+index"
        class="list-group-item p-0 pl-1 pr-1 justify-content-between align-items-center cursor-pointer border-0"
      >
        <h6 class="text-center bg-light p-1 rounded-lg">{{item.title}}</h6>
        <div class="row">
          <ListProj :projects="projects" :idnapravs="item.id" />
        </div>
      </li>
    </ul>
    <p v-else>
      <small>Список пуст</small>
    </p>
  </div>
</template>

<script>
import ListProj from '@/components/general/ListProj'

export default {
  components: {
    ListProj
  },
  props: {
    napravs: {
      type: Array
    },
    projects: {
      type: Array
    },
    idsphers: {
      type: String
    }
  },
  computed: {
    displayNaprav() {
      return this.napravs.filter(item => item.idsphers === this.idsphers)
    }
  }
}
</script>