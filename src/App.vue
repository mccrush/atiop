<template>
  <div>
    <Navbar />
    <div class="container-fluid">
      <component :is="Component" @edit-item="editItem" />
    </div>

    <transition name="slide-fade">
      <Message
        v-if="showMessage"
        :message="message.text"
        :class="message.type"
      />
    </transition>

    <ModalForm
      :item="itemForModal"
      :napravs="napravs"
      :projects="projects"
      id="exampleModal"
    />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.min.css'
import { Modal } from 'bootstrap'
import Navbar from '@/components/interface/Navbar3'
import Message from '@/components/additional/Message'
import Kanban from '@/views2/Kanban'
import Cards from '@/views2/Cards'
import Checklist from '@/views2/Checklist'
import ModalForm from '@/components/item/ModalForm'

export default {
  components: {
    Navbar,
    Message,
    Kanban,
    Cards,
    Checklist,
    ModalForm
  },
  data() {
    return {
      showMessage: false,
      itemForModal: null
    }
  },
  computed: {
    message() {
      return this.$store.getters.getMessage || ''
    },
    viewType() {
      return this.$store.getters.viewType
    },
    viewView() {
      return this.$store.getters.viewView
    },
    Component() {
      if (this.viewView === 'kanban') {
        return 'Kanban'
      } else if (this.viewView === 'cards') {
        return 'Cards'
      } else if (this.viewView === 'checklist') {
        return 'Checklist'
      } else {
        return 'Kanban'
      }
    },
    napravs() {
      return this.$store.getters.napravs2
    },
    projects() {
      return this.$store.getters.projects2
    },
    lists() {
      return this.$store.getters.lists2
    },
    tasks() {
      return this.$store.getters.tasks2
    }
  },
  methods: {
    editItem({ id, type }) {
      this.itemForModal = this[type].find(item => item.id === id)
      let myModal = new Modal(document.getElementById('exampleModal'))
      myModal.show()
    }
  },
  watch: {
    message() {
      if (this.message) {
        this.showMessage = true
        setTimeout(() => {
          this.showMessage = false
        }, 3600)
      }
    }
  }
}
</script>


<style>
.btn:focus,
.form-control:focus,
.form-select:focus,
.navbar-toggler:focus {
  outline: 0 !important;
  box-shadow: none !important;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter,
.component-fade-leave-to {
  opacity: 0;
}
</style>
