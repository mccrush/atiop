import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sphers: JSON.parse(localStorage.getItem('sphers') || '[]'),
    napravs: JSON.parse(localStorage.getItem('napravs') || '[]'),
    projects: JSON.parse(localStorage.getItem('projects') || '[]'),
    etaps: JSON.parse(localStorage.getItem('etaps') || '[]'),
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  },
  mutations: {
    addItem(state, item) {
      state[item.type].push(item)
      localStorage.setItem(item.type, JSON.stringify(state[item.type]))
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    sphers: state => state.sphers,
    napravs: state => state.napravs,
    projects: state => state.projects,
    etaps: state => state.etaps,
    tasks: state => state.tasks,
  }
})
