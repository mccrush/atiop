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
    lists() {
      if (this.projectId) {
        return this.$store.getters.lists2.filter(
          item => item.projectId === this.projectId
        )
      }
      return []
    }
  },
  methods: {
    async addItem() {
      try {
        if (this.itemTitle) {
          const napravId =
            this.napravId ||
            this.$store.getters.napravId ||
            localStorage.getItem('at-napravId')
          const projectId =
            this.projectId ||
            this.$store.getters.projectId ||
            localStorage.getItem('at-projectId')
          let listId = this.listId || localStorage.getItem('at-listId') || ''

          if (!listId) {
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

          const item = createItem(
            Date.now().toString(),
            this.itemTitle,
            this.type,
            napravId,
            projectId,
            listId
          )

          this.$store.commit('addItem2', item)
          const res = await this.$store.dispatch('addItem2', item)
          if (res) {
            this.$store.commit('addMessage', {
              text: 'Данные успешно добавлены',
              type: 'bg-success'
            })
          } else {
            this.$store.commit('addMessage', {
              text: 'Ошибка при добавлении данных 01',
              type: 'bg-danger'
            })
          }

          this.itemTitle = ''
        } else {
          alert('Невозможно создать елемент без заголоака')
        }
      } catch (error) {
        this.$store.commit('addMessage', {
          text: 'Ошибка при добавлении данных',
          type: 'bg-danger'
        })
        console.log('Ошибка при создании Item: Item.vue = ', error)
      }
    }
  }
}
</script>