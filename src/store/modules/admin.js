import fireApp from './../../firebase'
import { getFirestore, doc, setDoc, updateDoc, deleteDoc, collection, query, getDocs } from "firebase/firestore"
const db = getFirestore(fireApp)

//import { dataModels } from './../../data/dataModels'

export default {
  state: {
    user: [],
    directionId: localStorage.getItem('at-directionId') || '',
    projectId: localStorage.getItem('at-projectId') || '',
    taskId: localStorage.getItem('at-taskId') || '',
    item: JSON.parse(localStorage.getItem('at-item')) || null,
    view: localStorage.getItem('at-view') || 'all',
    mainView: localStorage.getItem('at-mainView') || 'list',
    appMode: localStorage.getItem('at-appMode') || 'tasks',
    tag: JSON.parse(localStorage.getItem('at-tag')) || null,
  },

  mutations: {
    removeItem(state, { item }) {
      state[item.type] = state[item.type].filter(el => el.id !== item.id)
    },
    addItem(state, { item }) {
      state[item.type].push(item)
    },
    setItemId(state, { type, id }) {
      state[type + 'Id'] = id
      localStorage.setItem('at-' + type + 'Id', id)
    },
    setItem(state, { item }) {
      state.item = item
      localStorage.setItem('at-item', JSON.stringify(item))
    },
    setItems(state, { type, items }) {
      state[type] = items
    },
    updateItem(state, { item }) {
      const index = state[item.type].findIndex(el => el.id === item.id)
      state[item.type][index] = item
    },
    updateLoadingStatus(state, value) {
      state.loading = value
    },
    setView(state, view) {
      state.view = view
      localStorage.setItem('at-view', view)
    },
    setMainView(state, mainView) {
      state.mainView = mainView
      localStorage.setItem('at-mainView', mainView)
    },
    setAppMode(state, appMode) {
      state.appMode = appMode
      localStorage.setItem('at-appMode', appMode)
    },
    setTag(state, tag) {
      state.tag = tag
      localStorage.setItem('at-tag', JSON.stringify(tag))
    }
  },

  actions: {
    async removeItem({ commit }, { item }) {
      try {
        //commit('updateLoadingStatus', true)
        commit('removeItem', { item })
        await deleteDoc(doc(db, item.type, item.id))
        //commit('updateLoadingStatus', false)
        console.log('admin.js: removeItem(): Данные удалены')
      } catch (error) {
        console.error('admin.js: removeItem(): error', error)
      }
    },

    async addItem({ commit }, { item }) {
      try {
        //commit('updateLoadingStatus', true)
        commit('addItem', { item })
        await setDoc(doc(db, item.type, item.id), item)
        //commit('updateLoadingStatus', false)
        console.log('admin.js: addItem(): Данные добавлены')
      } catch (error) {
        console.error('admin.js: addItem(): error', error)
      }
    },

    async updateItem({ commit }, { item }) {
      try {
        //commit('updateLoadingStatus', true)
        commit('updateItem', { item })
        const itemRef = doc(db, item.type, item.id)
        await updateDoc(itemRef, item)
        //commit('updateLoadingStatus', false)
        console.log('admin.js: updateItem(): Данные обновлены')
      } catch (error) {
        console.error('admin.js: updateItem(): error', error)
      }
    },

    async getItems({ commit }, { type }) {
      commit('updateLoadingStatus', true)
      let tempArray = []
      const q = query(collection(db, type))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        tempArray.push(doc.data())
      })
      commit('setItems', { type, items: tempArray })
      commit('updateLoadingStatus', false)
    }
  },

  getters: {
    directionId: state => state.directionId,
    projectId: state => state.projectId,
    taskId: state => state.taskId,
    item: state => state.item,
    view: state => state.view,
    mainView: state => state.mainView,
    appMode: state => state.appMode,
    tag: state => state.tag
  }
}