<template>
  <div class="input-group input-group-sm mb-2">
    <div v-if="tag" class="d-flex align-items-center">
      <div class="btn-group me-2">
        <button class="btn btn-sm btn-light disabled shadow-sm p-0 ps-2 pe-2">
          {{ tag }}
        </button>
        <button
          class="btn btn-sm btn-light text-muted p-0 ps-2 pe-2"
          @click="setTagFilter('')"
        >
          x
        </button>
      </div>
    </div>
    <input
      type="text"
      class="form-control"
      aria-describedby="searchItem"
      name="searchItem"
      placeholder="Поиск"
      v-model="searchFilter"
      @keyup="$emit('update-search', searchFilter)"
    />
    <BtnBackspace @click="clearSearch" />
  </div>
</template>

<script>
import BtnBackspace from './../buttons/BtnBackspace.vue'

export default {
  components: {
    BtnBackspace
  },
  emits: ['update-search'],
  data() {
    return {
      searchFilter: ''
    }
  },
  computed: {
    tag() {
      return this.$store.getters.tag
    }
  },
  methods: {
    setTagFilter(tag) {
      this.$store.commit('setTag', tag)
    },
    clearSearch() {
      this.searchFilter = ''
      this.$emit('update-search', this.searchFilter)
    }
  }
}
</script>