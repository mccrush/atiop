<template>
  <div>
    <Navbar />
    <SettingsBar />
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
      :lists="lists"
      id="exampleModal"
    />
  </div>
</template>

<script>
//import 'bootstrap/dist/css/bootstrap.min.css'
//import Offcanvas from 'bootstrap/js/dist/offcanvas'
//import { Dropdown, Modal, Tooltip } from 'bootstrap'
import Navbar from './components/interface/Navbar.vue'
import SettingsBar from './components/interface/SettingsBar.vue'
import Message from './components/additional/Message.vue'
import ViewProjects from './views/ViewProjects.vue'
import ViewTasks from './views/ViewTasks.vue'
import ViewPersonPlan from './views/ViewPersonPlan.vue'
import ViewCalendar from './views/ViewCalendar.vue'
import ViewNewStruct from './views/ViewNewStruct.vue'
import Login from './views/Login.vue'
import ModalForm from './components/item/ModalForm.vue'

export default {
  components: {
    Navbar,
    SettingsBar,
    Message,
    ViewProjects,
    ViewTasks,
    ViewPersonPlan,
    ViewCalendar,
    ViewNewStruct,
    Login,
    ModalForm
  },
  data() {
    return {
      showMessage: false,
      itemForModal: {}
    }
  },
  computed: {
    userId() {
      return this.$store.getters.userId
    },
    message() {
      return this.$store.getters.getMessage || ''
    },
    viewType() {
      return this.$store.getters.viewType
    },
    Component() {
      if (this.userId) {
        //return 'ViewNewStruct'
        if (this.viewType === 'tasks') {
          return 'ViewTasks'
        } else if (
          this.viewType === 'napravs' ||
          this.viewType === 'projects'
        ) {
          return 'ViewProjects'
        } else if (this.viewType === 'person') {
          return 'ViewPersonPlan'
        } else if (this.viewType === 'calendar') {
          return 'ViewCalendar'
        }
      } else {
        return 'Login'
      }
    },
    napravs() {
      return this.$store.getters.napravs
    },
    projects() {
      return this.$store.getters.projects
    },
    lists() {
      return this.$store.getters.lists
    },
    tasks() {
      return this.$store.getters.tasks
    }
  },
  // mounted() {
  //   var tooltipTriggerList = [].slice.call(
  //     document.querySelectorAll('[data-bs-toggle="tooltip"]')
  //   )
  //   var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  //     return new Tooltip(tooltipTriggerEl)
  //   })
  // },
  methods: {
    editItem({ id, type }) {
      this.itemForModal = this[type].find(item => item.id === id)
      let myModal = new Modal(document.getElementById('exampleModal'))
      myModal.show()
    }
    // Испльзуется в админских целях, для добавления новых свойств item
    // Запускать в mounted
    // addNewField() {
    //   this.napravs.forEach(item => {
    //     this.$store.dispatch('addNewField', {
    //       id: item.id
    //     })
    //   })
    // }
  },
  watch: {
    message() {
      if (this.message) {
        this.showMessage = true
        setTimeout(() => {
          this.showMessage = false
          this.$store.commit('addMessage', 'null')
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

.dropdown-item {
  cursor: pointer;
}

.dropdown-item.active,
.dropdown-item:active {
  color: #fff;
  text-decoration: none;
  background-color: #ffc107;
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
