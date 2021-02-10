//import { auth } from '@/firebase.js'
//import { db } from '@/firebase.js'

export default {
  state: {
    napravs: [],
    projects: [],
    lists: [],
    tasks: [],
  },
  mutations: {
    addItem2(state, item) {
      state[item.type].push(item)
    },
  },
  actions: {},
  getters: {
    napravs2: state => state.napravs,
    projects2: state => state.projects,
    lists2: state => state.lists,
    tasks2: state => state.tasks,
  }
}