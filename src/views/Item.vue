<template>
  <div>
    <!-- Filter -->
    <div class="row border-bottom p-0">
      <div class="col-2 col-xl-1 p-2">
        <Loading v-if="!napravs.length" />
        <FilterSelect v-else :items="napravs" :type="'nap'" />
      </div>
      <div class="col-2 col-xl-1 p-2">
        <FilterSelect :items="projects" :type="'proj'" />
      </div>
      <div class="col-2 col-xl-1 p-2">
        <FilterSelect :items="lists" :type="'list'" />
      </div>
      <div class="col-2 col-xl-2 p-2">
        <AddItem :type="'napravs'" />
      </div>
      <div class="col-2 col-xl-2 p-2">
        <AddItem v-if="$route.query.nap" :type="'projects'" />
      </div>
      <div class="col-2 col-xl-2 p-2">
        <AddItem v-if="$route.query.proj" :type="'lists'" />
      </div>
      <!-- <div class="col-1 col-xl-6 text-end">
        <Loading v-if="loading" />
      </div> -->
    </div>
    <!-- Lists -->
    <!-- <Loading v-if="!lists.length" /> -->
    <!-- <div v-if="!lists.length">Список элементов пуст</div> -->
    <div class="row overflow-auto my-row-project">
      <List v-for="list in lists" :key="'list' + list.id" :list="list" />
    </div>
  </div>
</template>

<script>
import Loading from '@/components/additional/Loading'
import List from '@/components/item/List'
import FilterSelect from '@/components/item/FilterSelect'
import AddItem from '@/components/item/AddItem'

export default {
  components: {
    Loading,
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
    tasks() {
      return this.$store.getters.tasks2
    },
  },
}
</script>

<style scoped>
.my-row-project {
  height: calc(100vh - 108px) !important;
  background-color: coral;
}
</style>