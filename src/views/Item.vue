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
      <div class="col-3 col-xl-2 p-2">
        <AddItem :type="'napravs'" />
        <!-- <input
          type="text"
          class="form-control form-control-sm border-0 bg-light"
          @focus="itemTitleProject = ''"
          @keypress.enter="addItem('napravs')"
          v-model.trim="itemTitleNaprav"
          placeholder="Создать направление"
        /> -->
      </div>
      <div class="col-3 col-xl-2 p-2">
        <AddItem v-if="$route.query.nap" :type="'projects'" />
        <!-- <input
          v-if="$route.query.nap"
          type="text"
          class="form-control form-control-sm border-0 bg-light"
          @focus="itemTitleNaprav = ''"
          @keypress.enter="addItem('projects')"
          v-model.trim="itemTitleProject"
          placeholder="Создать проект"
        /> -->
      </div>
      <div class="col-2 col-xl-6 text-end">
        <Loading v-if="loading" />
      </div>
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
      itemTitleNaprav: '',
      itemTitleProject: '',
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
    tasks() {
      return this.$store.getters.tasks2
    },
    lists() {
      if (this.$route.query.nap && this.$route.query.proj) {
        return [
          { id: 1, title: 'list of proj 1' },
          { id: 2, title: 'list of proj 2' },
          { id: 3, title: 'list of proj 3' },
          { id: 4, title: 'list of proj 4' },
        ]
      } else if (this.$route.query.nap) {
        return this.projects
      } else {
        return this.napravs
      }
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