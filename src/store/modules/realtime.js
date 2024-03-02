import { dataModels } from './../../data/dataModels'
import fireApp from './../../firebase'
import { getDatabase, ref, set, onValue, update, remove, query, orderByChild, equalTo, limitToLast } from 'firebase/database'
const db = getDatabase(fireApp)

export default {
  state: {
    loadingRT: false,
    direction: [],
    project: [],
    task: [],
  },
  mutations: {
    setItemsRT(state, { type, items }) {
      state[type] = items
    },
    updateLoadingStatusRT(state, value) {
      state.loadingRT = value
    },
  },
  actions: {
    getAllItemsRT({ dispatch }, { currentUserId, appMode }) {
      dataModels.forEach(element => {
        if (element.appMode === appMode) {
          dispatch('getItemsRT', { type: element.type, currentUserId, appMode })
        }
      })
    },
    async removeItemRT({ commit }, { item, currentUserId, appMode }) {
      try {
        commit('updateLoadingStatusRT', true)
        await remove(ref(db, currentUserId + '/' + appMode + '/' + item.type + '/' + item.id))
        commit('updateLoadingStatusRT', false)
      } catch (error) {
        console.error('error realtime.js removeItemRT()', error)
      }
    },
    async updateItemRT({ commit }, { item, currentUserId, appMode }) {
      try {
        commit('updateLoadingStatusRT', true)
        await update(ref(db, currentUserId + '/' + appMode + '/' + item.type + '/' + item.id), item)
        commit('updateLoadingStatusRT', false)
      } catch (error) {
        console.error('error realtime.js updateItemRT()', error)
      }
    },

    // Получение Универсальное
    getItemsRT({ commit }, { type, currentUserId, appMode }) {
      try {
        //console.log('getItemsRT() appMode ', appMode)
        commit('updateLoadingStatusRT', true)
        let itemsRef

        itemsRef = query(ref(db, currentUserId + '/' + appMode + '/' + type), orderByChild('dateCreate'))

        onValue(itemsRef, (snapshot) => {
          //console.log('getItemsRT() run ', type)
          let tempArray = []
          const data = snapshot.val()
          for (let item in data) {
            tempArray.push(data[item])
          }
          commit('setItemsRT', { type, items: tempArray })
          commit('updateLoadingStatusRT', false)
        })
      } catch (error) {
        console.error('error getItemsRT()', error)
      }
    },

    async addItemRT({ commit }, { item, currentUserId, appMode }) {
      try {
        commit('updateLoadingStatusRT', true)
        await set(ref(db, currentUserId + '/' + appMode + '/' + item.type + '/' + item.id), item)
        console.log('addItemRT() add item.id', item.id)
        commit('updateLoadingStatusRT', false)
      } catch (error) {
        console.error('error realtime.js addItemRT()', error)
      }
    }
  },
  getters: {
    loadingRT: state => state.loadingRT,
    direction: state => state.direction,
    project: state => state.project,
    task: state => state.task,

    childrenItems: state => (type, parentId) => state[type].filter(item => item.parentId === parentId),
    childrenItemsLength: state => (type, parentId) => state[type].filter(item => item.parentId === parentId).length
  }
}