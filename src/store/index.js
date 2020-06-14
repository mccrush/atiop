import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sphers: JSON.parse(localStorage.getItem('sphers') || '[]'),
    napravs: JSON.parse(localStorage.getItem('napravs') || '[]'),
    projects: JSON.parse(localStorage.getItem('projects') || '[]'),
    tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  },
  mutations: {
    addItem(state, item) {
      state[item.type].push(item)
      localStorage.setItem(item.type, JSON.stringify(state[item.type]))
    },
    removeItem(state, { id, type }) {
      state[type] = state[type].filter(item => item.id !== id)
      localStorage.setItem(type, JSON.stringify(state[type]))
    }
  },
  actions: {
    addItem({ commit }, item) {
      commit('addItem', item)
    },
    removeItem({ commit }, { id, type }) {
      commit('removeItem', { id, type })
    }
  },
  modules: {
  },
  getters: {
    sphers: state => state.sphers,
    napravs: state => state.napravs,
    projects: state => state.projects,
    tasks: state => state.tasks,
  }
})
