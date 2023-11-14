<template>
  <div class="col-4">
    <FormItem :type="type" :parentId="parentId" />

    <ul class="list-group mt-2">
      <li
        v-for="item in items"
        :key="item.id"
        class="list-group-item bg-white d-flex justify-content-between align-items-center"
        @click="setItemId(item.id)"
      >
        <div class="me-auto">
          <div class="fw-bold">{{ item.title }}</div>
        </div>
        <button class="btn btn-sm btn-light">D</button>
      </li>
    </ul>
  </div>
</template>

<script>
import FormItem from './../../components/forms/FormItem.vue'

export default {
  components: {
    FormItem
  },
  props: {
    parentId: String,
    type: String
  },
  computed: {
    items() {
      if (this.type === 'project' || this.type === 'task') {
        return this.$store.getters[this.type].filter(
          item => item.parentId === this.parentId
        )
      } else {
        return this.$store.getters[this.type]
      }
    }
  },
  methods: {
    setItemId(id) {
      if (this.type === 'direction') {
        this.$store.commit('setItemId', { type: 'project', item: '' })
      }
      this.$store.commit('setItemId', { type: this.type, item: id })
    }
  }
}
</script>