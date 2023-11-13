<template>
  <div
    class="row d-flex flex-nowrap align-items-start bg-light pt-3 ps-2 kanban"
    id="rowScroll"
  >
    <List
      v-for="list in sortList"
      :key="'list' + list.id"
      :list="list"
      @edit-item="editItem"
    />
  </div>
</template>

<script>
import sortMethod from './../scripts/sortMethod'
import List from './../components/item/List'

export default {
  components: {
    List
  },
  computed: {
    viewType() {
      return this.$store.getters.viewType
    },
    napravId() {
      return this.$store.getters.napravId
    },
    projectId() {
      return this.$store.getters.projectId
    },
    lists() {
      return this.$store.getters.lists
    },
    items() {
      if (this.viewType === 'napravs') {
        return this.$store.getters.napravs
      } else {
        return this.$store.getters.projects
      }
    },
    itemsFilter() {
      if (this.napravId) {
        if (this.projectId) {
          return this.lists.filter(item => item.projectId === this.projectId)
        } else {
          return this.items.filter(item => item.napravId === this.napravId)
        }
      } else {
        return this.items
      }
    },
    sortList() {
      return sortMethod(this.itemsFilter, 'asc', 'position')
    }
  },
  mounted() {
    const slider = document.querySelector('#rowScroll')

    let isDown = false
    let startX
    let scrollLeft

    slider.addEventListener('mousedown', e => {
      isDown = true
      slider.classList.add('active')
      startX = e.pageX - slider.offsetLeft
      scrollLeft = slider.scrollLeft
    })
    slider.addEventListener('mouseleave', () => {
      isDown = false
      slider.classList.remove('active')
    })
    slider.addEventListener('mouseup', () => {
      isDown = false
      slider.classList.remove('active')
    })
    slider.addEventListener('mousemove', e => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - slider.offsetLeft
      const walk = (x - startX) * 1 //scroll-fast
      slider.scrollLeft = scrollLeft - walk
    })
  },
  methods: {
    editItem({ id, type }) {
      this.$emit('edit-item', { id, type })
    }
  }
}
</script>

<style scoped>
.kanban {
  height: calc(100vh - 56px);
  overflow-x: auto;
}

.my-width-none {
  width: auto !important;
  max-width: none !important;
}

.active {
  cursor: grabbing;
}
</style>