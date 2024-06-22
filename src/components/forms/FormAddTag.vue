<template>
  <div class="border-0 p-2">
    <input
      class="form-control form-control-sm"
      type="text"
      id="searchTag"
      v-model="searchTag"
    />
    <ul class="list-group mt-1">
      <li
        v-for="tag in filterTags"
        :key="tag.id"
        class="cursor-pointer list-group-item p-0"
      >
        <div class="d-flex justify-content-between">
          <div class="w-100 ps-2" @click="$emit('toggle-tag', tag)">
            {{ tag.title }}
          </div>
          <button
            class="btn btn-sm btn-dark text-body-secondary p-0 ps-2 pe-2"
            @click="removeTag(tag)"
          >
            x
          </button>
        </div>
      </li>
    </ul>
    <button
      v-if="searchTag"
      class="btn btn-sm btn-dark text-body-secondary w-100 mt-1"
      @click="createTag"
    >
      Создать тег
    </button>
  </div>
</template>

<script>
import { modelsFactory } from './../../helpers/modelsFactory'

export default {
  emits: ['toggle-tag'],
  data() {
    return {
      searchTag: ''
    }
  },
  computed: {
    currentUserId() {
      return this.$store.getters.currentUserId
    },
    appMode() {
      return this.$store.getters.appMode
    },
    tags() {
      return this.$store.getters.tags
    },
    filterTags() {
      return this.tags.filter(item =>
        item.title.toUpperCase().includes(this.searchTag.toUpperCase())
      )
    }
  },
  methods: {
    createTag() {
      if (this.searchTag) {
        let item = modelsFactory({ type: 'tags' })
        item.title = this.searchTag
        // this.$store.dispatch('addITag', {
        //   item,
        //   currentUserId: this.currentUserId
        // })

        this.$store.dispatch('addItemRT', {
          item,
          currentUserId: this.currentUserId,
          appMode: this.appMode
        })

        this.$emit('toggle-tag', item)
        this.searchTag = ''
      }
    },
    removeTag(tag) {
      // this.$store.dispatch('removeTag', {
      //   item: tag,
      //   currentUserId: this.currentUserId
      // })

      this.$store.dispatch('removeItemRT', {
        item: tag,
        currentUserId: this.currentUserId,
        appMode: this.appMode
      })
    }
  }
}
</script>