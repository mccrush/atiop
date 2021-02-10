<template>
  <div>
    <!-- Filter -->
    <div class="row border-bottom p-0">
      <div class="col-2 p-2">
        <select
          class="form-select form-select-sm"
          v-model="filterNaprav"
          @change="saveFilterNaprav"
        >
          <option value selected>Все</option>
          <option
            v-for="naprav in napravs"
            :key="'nap' + naprav.id"
            :value="naprav.id"
          >
            {{ naprav.title }}
          </option>
        </select>
      </div>
      <div class="col-2 p-2">
        <select
          class="form-select form-select-sm"
          v-model="filterProject"
          @change="saveFilterProject"
        >
          <option value selected>Все</option>
          <option
            v-for="project in projects"
            :key="'nap' + project.id"
            :value="project.id"
          >
            {{ project.title }}
          </option>
        </select>
      </div>
      <div class="col-2 p-2">
        <input
          type="text"
          class="form-control"
          @keypress.enter="addItem"
          v-model.trim="itemTitle"
        />
      </div>
    </div>
    <!-- Lists -->
    <!-- <Loading v-if="!lists.length" /> -->
    <div v-if="!lists.length">Список элементов пуст</div>
    <div v-else class="row overflow-auto my-row-project">
      <List v-for="list in lists" :key="'list' + list.id" :list="list" />
    </div>
  </div>
</template>

<script>
import createItem from '@/scripts/createItem'
import List from '@/components/item/List'
import Loading from '@/components/additional/Loading'

export default {
  components: {
    List,
    Loading,
  },
  data() {
    return {
      filterNaprav: localStorage.getItem('at-filterNaprav') || '',
      filterProject: localStorage.getItem('at-filterProject') || '',
      itemTitle: '',
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
  methods: {
    saveFilterNaprav() {
      this.$router.push({ query: { nap: this.filterNaprav } })
      localStorage.setItem('at-filterNaprav', this.filterNaprav)
    },
    saveFilterProject() {
      this.$router.push({
        query: { nap: this.filterNaprav, proj: this.filterProject },
      })
      localStorage.setItem('at-filterProject', this.filterProject)
    },
    async addItem() {
      try {
        if (this.itemTitle) {
          const item = createItem(
            Date.now().toString(),
            this.itemTitle,
            'naprav'
          )

          this.$store.commit('addItem2', item)
          //await this.$store.dispatch('addItem2', item)
          this.itemTitle = ''
        } else {
          alert('Невозможно создать Направление без заголоака')
        }
      } catch (error) {
        console.log('Ошибка при создании Item: Item.vue = ', error)
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