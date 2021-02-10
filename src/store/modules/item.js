import { auth } from '@/firebase.js'
import { db } from '@/firebase.js'



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
  actions: {
    async addItem2({ commit }, item) {
      try {
        const REF = db.collection('users').doc(auth.currentUser.uid)
        const res = await REF.collection('items').doc(item.id).set(item)
        return true
      } catch (error) {
        throw error
      }

    }
  },
  getters: {
    napravs2: state => state.napravs,
    projects2: state => state.projects,
    lists2: state => state.lists,
    tasks2: state => state.tasks,
  }
}