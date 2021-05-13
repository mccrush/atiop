<template>
  <input
    type="text"
    class="form-control form-control-sm border-0 bg-light"
    @keypress.enter="addItem"
    v-model.trim="itemTitle"
    :placeholder="placeholder"
  />
</template>

<script>
import createItem from '@/scripts/createItem'

export default {
  props: {
    type: String,
    napravId: { type: String, default: '' },
    projectId: { type: String, default: '' },
    listId: { type: String, default: '' }
  },
  data() {
    return {
      itemTitle: ''
    }
  },
  computed: {
    placeholder() {
      if (this.type === 'napravs') {
        return 'Создать направление'
      } else if (this.type === 'projects') {
        return 'Создать проект'
      } else if (this.type === 'lists') {
        return 'Добавить список'
      } else {
        return 'Добавить задачу'
      }
    },
    napravs() {
      return this.$store.getters.napravs
    },
    projects() {
      return this.$store.getters.projects
    },
    lists() {
      if (this.projectId) {
        return this.$store.getters.lists.filter(
          item => item.projectId === this.projectId
        )
      }
      return this.$store.getters.lists
    }
  },
  methods: {
    async addItem() {
      if (this.itemTitle) {
        let napravTitle, projectTitle, listTitle
        const napravId = this.napravId || this.$store.getters.napravId
        const projectId = this.projectId || this.$store.getters.projectId
        let listId = this.listId || this.$store.getters.listId

        if (this.type === 'tasks' && !listId) {
          let list = this.lists.find(item => item.title === 'Inbox') || false

          if (!list) {
            list = createItem(
              Date.now().toString(),
              'Inbox',
              'lists',
              napravId,
              projectId
            )

            this.$store.commit('addItem', list)
            await this.$store.dispatch('addItem', list)
          }
          listId = list.id
        }

        if (napravId) {
          napravTitle = this.napravs.find(item => item.id === napravId).title
        } else {
          napravTitle = 'Без направления'
        }

        if (projectId) {
          projectTitle = this.projects.find(item => item.id === projectId).title
        } else {
          projectTitle = 'Без проекта'
        }

        if (listId) {
          listTitle = this.lists.find(item => item.id === listId).title
        } else {
          listTitle = 'Inbox'
        }

        const item = createItem(
          Date.now().toString(),
          this.itemTitle,
          this.type,
          napravId,
          projectId,
          listId,
          napravTitle,
          projectTitle,
          listTitle
        )

        this.$store.commit('addItem', item)
        this.itemTitle = '' // Очищаем до Dispatch
        const res = await this.$store.dispatch('addItem', item)
        if (res) {
          this.$store.commit('addMessage', 'das')
        } else {
          this.$store.commit('addMessage', 'dae')
        }
      } else {
        alert('Невозможно создать елемент без заголоака')
      }
    }
  }
}
</script>