<template>
  <div>
    <!-- Filter -->
    <div class="row border-bottom p-0 ps-1">
      <div class="col-12 col-sm-6 col-md-2 col-xl-1 p-2">
        <FilterSelect
          :items="napravs"
          :type="'nap'"
          :filterIn="nap"
          @new-filter="updateFilterNap"
        />
      </div>
      <div class="col-12 col-sm-6 col-md-2 col-xl-1 p-2">
        <FilterSelect
          :items="projects"
          :type="'proj'"
          :filterIn="proj"
          @new-filter="updateFilterProj"
        />
      </div>
      <!-- <div class="col-2 col-xl-1 p-2">
        <FilterSelect :items="lists" :type="'list'" />
      </div> -->
      <div class="col-12 col-sm-6 col-md-3 col-xl-2 p-2">
        <AddItem :type="'napravs'" />
      </div>
      <div class="col-12 col-sm-6 col-md-3 col-xl-2 p-2">
        <AddItem v-if="$route.query.nap" :type="'projects'" />
      </div>
      <div class="col-12 col-sm-6 col-md-2 col-xl-2 p-2">
        <AddItem v-if="$route.query.proj" :type="'lists'" />
      </div>
    </div>

    <!-- Lists -->
    <div class="my-row-project row overflow-auto">
      <div class="my-width-none">
        <List v-for="list in lists" :key="'list' + list.id" :list="list" />
      </div>
    </div>
  </div>
</template>

<script>
import List from '@/components/item/List'
import FilterSelect from '@/components/item/FilterSelect'
import AddItem from '@/components/item/AddItem'

export default {
  components: {
    List,
    FilterSelect,
    AddItem,
  },
  data() {
    return {
      loading: false,
    }
  },
  computed: {
    nap() {
      return this.$store.getters.nap
    },
    proj() {
      return this.$store.getters.proj
    },
    napravs() {
      return this.$store.getters.napravs2
    },
    projects() {
      if (this.nap) {
        return this.$store.getters.projects2.filter(
          (proj) => proj.napravId === this.nap
        )
      } else {
        return this.$store.getters.projects2
      }
    },
    lists() {
      if (this.nap && this.proj) {
        return this.$store.getters.lists2.filter(
          (list) => list.projectId === this.proj
        )
      } else if (this.nap) {
        return this.projects
      } else {
        return this.napravs
      }
    },
  },
  // Формируем URL при первой загрузке компонента
  beforeMount() {
    if (this.nap && this.proj) {
      this.$router.push({
        query: { nap: this.nap, proj: this.proj },
      })
    } else if (this.nap) {
      this.$router.push({ query: { nap: this.nap } })
    } else {
      this.$router.push({ query: '' })
    }
  },
  methods: {
    updateFilterNap(newValNap) {
      this.$store.commit('setNap', newValNap)
      if (newValNap) {
        this.$router.push({ query: { nap: newValNap } })
      } else {
        this.$router.push({ query: '' })
      }
    },
    updateFilterProj(newValProj) {
      this.$store.commit('setNapProj', {
        nap: this.nap,
        proj: newValProj,
      })
      this.$router.push({
        query: { nap: this.nap, proj: newValProj },
      })
    },
  },
}
</script>

<style scoped>
.my-row-project {
  height: calc(100vh - 108px) !important;
}

.my-width-none {
  width: auto !important;
  max-width: none !important;
}
</style>