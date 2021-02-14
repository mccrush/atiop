<template>
  <div>
    <!-- Filter -->
    <div class="row border-bottom p-0 ps-1">
      <div class="col-2 col-xl-1 p-2">
        <FilterSelect :items="napravs" :type="'nap'" />
      </div>
      <div class="col-2 col-xl-1 p-2">
        <FilterSelect :items="projects" :type="'proj'" />
      </div>
      <!-- <div class="col-2 col-xl-1 p-2">
        <FilterSelect :items="lists" :type="'list'" />
      </div> -->
      <div class="col-2 col-xl-2 p-2">
        <AddItem :type="'napravs'" />
      </div>
      <div class="col-2 col-xl-2 p-2">
        <AddItem v-if="$route.query.nap" :type="'projects'" />
      </div>
      <div class="col-2 col-xl-2 p-2">
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
      if (this.$route.query.nap) {
        return this.$store.getters.projects2.filter(
          (proj) => proj.napravId === this.$route.query.nap
        )
      } else {
        return this.$store.getters.projects2
      }
    },
    lists() {
      if (this.$route.query.nap && this.$route.query.proj) {
        return this.$store.getters.lists2.filter(
          (list) => list.projectId === this.$route.query.proj
        )
      } else if (this.$route.query.nap) {
        return this.projects
      } else {
        return this.napravs
      }
    },
  },
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