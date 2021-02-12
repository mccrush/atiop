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
    listId: String,
  },
  data() {
    return {
      itemTitle: '',
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
  },
  methods: {
    async addItem() {
      try {
        if (this.itemTitle) {
          const napravId = this.$route.query.nap || ''
          const projectId = this.$route.query.proj || ''
          const listId =
            this.listId || localStorage.getItem('at-filterList') || ''

          const item = createItem(
            Date.now().toString(),
            this.itemTitle,
            this.type,
            napravId,
            projectId,
            listId
          )

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

          this.itemTitle = ''
        } else {
          alert('Невозможно создать елемент без заголоака')
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
</style>