<template>
  <div>
    <!-- Filter -->
    <div class="row border-bottom p-0">
      <div class="col-2 col-xl-1 p-2">
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
      <div class="col-2 col-xl-1 p-2">
        <select
          class="form-select form-select-sm"
          :disabled="!filterNaprav"
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
      <div class="col-3 col-xl-2 p-2">
        <input
          type="text"
          class="form-control form-control-sm border-0 bg-light"
          @focus="itemTitleProject = ''"
          @keypress.enter="addItem('napravs')"
          v-model.trim="itemTitleNaprav"
          placeholder="Создать направление"
        />
      </div>
      <div class="col-3 col-xl-2 p-2">
        <input
          v-if="filterNaprav"
          type="text"
          class="form-control form-control-sm border-0 bg-light"
          @focus="itemTitleNaprav = ''"
          @keypress.enter="addItem('projects')"
          v-model.trim="itemTitleProject"
          placeholder="Создать проект"
        />
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
  methods: {
    saveFilterNaprav() {
      this.$router.push({ query: { nap: this.filterNaprav } })
      localStorage.setItem('at-filterNaprav', this.filterNaprav)
      this.filterProject = ''
      localStorage.setItem('at-filterProject', this.filterProject)
    },
    saveFilterProject() {
      this.$router.push({
        query: { nap: this.filterNaprav, proj: this.filterProject },
      })
      localStorage.setItem('at-filterProject', this.filterProject)
    },
    async addItem() {
      try {
        if (this.itemTitleNaprav || this.itemTitleProject) {
          const title = this.itemTitleNaprav
            ? this.itemTitleNaprav
            : this.itemTitleProject
          const type = this.itemTitleNaprav ? 'napravs' : 'projects'
          const napravId = this.itemTitleProject ? this.filterNaprav : ''
          const item = createItem(Date.now().toString(), title, type, napravId)

          this.$store.commit('addItem2', item)

          this.loading = true
          const res = await this.$store.dispatch('addItem2', item)
          if (res) {
            this.loading = false
            this.$store.commit('addMessage', {
              text: 'Данные успешно добавлены',
              type: 'bg-success',
            })
          } else {
            this.$store.commit('addMessage', {
              text: 'Ошибка при добавлении данных 01',
              type: 'bg-danger',
            })
          }

          this.itemTitleNaprav = ''
          this.itemTitleProject = ''
        } else {
          alert('Невозможно создать Направление без заголоака')
        }
      } catch (error) {
        this.$store.commit('addMessage', {
          text: 'Ошибка при добавлении данных',
          type: 'bg-danger',
        })
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