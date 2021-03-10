<template>
  <input
    type="text"
    class="form-control form-control-sm border-0 bg-light"
    :class="{ 'mb-2': type === 'tasks' }"
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
    listId: { type: String, default: '' },
    napravId: { type: String, default: '' },
    projectId: { type: String, default: '' }
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
      return this.$store.getters.napravs2
    },
    projects() {
      return this.$store.getters.projects2
    },
    lists() {
      if (this.projectId) {
        return this.$store.getters.lists2.filter(
          item => item.projectId === this.projectId
        )
      }
      return this.$store.getters.lists2
    }
  },
  methods: {
    async addItem() {
      try {
        if (this.itemTitle) {
          let napravTitle, projectTitle, listTitle
          const napravId = this.napravId || this.$store.getters.napravId
          const projectId = this.projectId || this.$store.getters.projectId
          let listId = this.listId || this.$store.getters.listId

          if (this.type === 'tasks' && !listId) {
            let list = this.lists.find(item => item.title === 'Inbox')
            if (!list) {
              list = createItem(
                Date.now().toString(),
                'Inbox',
                'lists',
                napravId,
                projectId
              )
              this.$store.commit('addItem2', list)
              await this.$store.dispatch('addItem2', list)
            }
            listId = list.id
          }

          if (napravId) {
            napravTitle = this.napravs.find(item => item.id === napravId).title
          } else {
            napravTitle = 'Без направления'
          }

          if (projectId) {
            projectTitle = this.projects.find(item => item.id === projectId)
              .title
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

          this.$store.commit('addItem2', item)
          const res = await this.$store.dispatch('addItem2', item)
          if (res) {
            this.$store.commit('addMessage', 'das')
          } else {
            this.$store.commit('addMessage', 'dae')
          }

          this.itemTitle = ''
        } else {
          alert('Невозможно создать елемент без заголоака')
        }
      } catch (error) {
        this.$store.commit('addMessage', 'dae')
        console.log('Ошибка при создании Item: Item.vue = ', error)
      }
    }
  }
}
</script>