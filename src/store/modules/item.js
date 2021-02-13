import { auth } from '@/firebase.js'
import { db } from '@/firebase.js'



export default {
  state: {
    napravs: [],
    projects: [],
    lists: [],
    tasks: [],
    loading2: false,
    nap: localStorage.getItem('at-filterNaprav') || '',
    proj: localStorage.getItem('at-filterProject') || '',
  },
  mutations: {
    setNap(state, nap) {
      state.nap = nap
      state.proj = ''
      localStorage.setItem('at-filterNaprav', nap)
      localStorage.setItem('at-filterProject', '')
    },
    setProj(state, proj) {
      state.proj = proj
      localStorage.setItem('at-filterProject', proj)
    },
    setNapProj(state, { nap, proj }) {
      state.nap = nap
      state.proj = proj
      localStorage.setItem('at-filterNaprav', nap)
      localStorage.setItem('at-filterProject', proj)
    },
    changeLoading(state, value) {
      state.loading2 = value
    },
    addItem2(state, item) {
      state[item.type].push(item)
    },
    setItems2(state, { type, items = [] }) {
      state[type] = items
    }
  },
  actions: {
    async addItem2({ commit }, item) {
      try {
        const REF = db.collection('users').doc(auth.currentUser.uid).collection('items')
        const res = await REF.doc(item.id).set(item)
        return true
      } catch (error) {
        throw error
      }
    },
    async getItems2({ commit }) {
      try {
        commit('changeLoading', true)
        let napravs = [], projects = [], lists = [], tasks = []
        const REF = db.collection('users').doc(auth.currentUser.uid).collection('items')
        const snapshot = await REF.get()
        snapshot.forEach(doc => {
          if (doc.data().type === 'napravs') {
            napravs.push(doc.data())
          } else if (doc.data().type === 'projects') {
            projects.push(doc.data())
          } else if (doc.data().type === 'lists') {
            lists.push(doc.data())
          } else if (doc.data().type === 'tasks') {
            tasks.push(doc.data())
          }
        })
        commit('setItems2', { type: 'napravs', items: napravs })
        commit('setItems2', { type: 'projects', items: projects })
        commit('setItems2', { type: 'lists', items: lists })
        commit('setItems2', { type: 'tasks', items: tasks })
        commit('changeLoading', false)
        console.log('Данные с сервера переданы в State')
      } catch (error) {
        console.log('Ошибка item.js -> getItems2:', error)
      }
    }
  },
  getters: {
    napravs2: state => state.napravs,
    projects2: state => state.projects,
    lists2: state => state.lists,
    tasks2: state => state.tasks,
    loading2: state => state.loading2,
    nap: state => state.nap,
    proj: state => state.proj
  }
}