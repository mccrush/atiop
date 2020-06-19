<template>
  <div class="col-12 p-1 ower">
    <ul v-if="sphers.length" class="list-group list-group-horizontal mt-2">
      <li
        v-for="(item, index) in sphers"
        :key="'in'+index"
        class="list-group-item justify-content-between align-items-center border-0 p-0 ml-1 mr-1 cursor-pointer"
      >
        <h5
          class="text-center bg-light p-1 rounded-lg m-0 elem"
          :style="'background:'+item.color+' !important'"
          @dblclick.prevent="$emit('edit-item', {id: item.id, type: item.type})"
        >{{item.title}}</h5>
        <div class="row">
          <ListNaprav
            :napravs="napravs"
            :projects="projects"
            :idsphers="item.id"
            :color="item.color"
            @edit-item="editItem"
          />
        </div>
      </li>
    </ul>
    <p v-else>
      <small>Список пуст</small>
    </p>
  </div>
</template>

<script>
import ListNaprav from '@/components/general/ListNaprav'

export default {
  components: {
    ListNaprav
  },
  props: {
    sphers: {
      type: Array
    },
    napravs: {
      type: Array
    },
    projects: {
      type: Array
    }
  },
  mounted() {
    const slider = document.querySelector('.ower')
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
      const walk = x - startX
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
</style>