<template>
  <div class="col-2">
    <ul v-if="napravs.length" class="list-group list-group-horizontal mt-3">
      <li
        v-for="(item, index) in displayNaprav"
        :key="'in'+index"
        class="list-group-item p-2 pl-3 justify-content-between align-items-center cursor-pointer"
      >
        <span>{{item.title}} + ids {{idsphers}}</span>
        <div class="row">
          <ListProj :projects="projects" :idnapravs="item.id" />
        </div>
      </li>
    </ul>
    <p v-else>Значений нет</p>
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
      return this.napravs.filter(item => (item.idsphers = this.idsphers))
    }
  }
}
</script>