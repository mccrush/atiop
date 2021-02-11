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
  },
  data() {
    return {
      itemTitle: '',
    }
  },
  computed: {
    placeholder() {
      return this.type === 'napravs' ? 'Создать направление' : 'Создать проект'
    },
  },
  methods: {
    async addItem() {
      try {
        if (this.itemTitle) {
          const napravId = this.$route.query.nap || ''
          const item = createItem(
            Date.now().toString(),
            this.itemTitle,
            this.type,
            napravId
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

          this.itemTitleNaprav = ''
          this.itemTitleProject = ''
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