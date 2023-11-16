//import getWeek from './../../helpers/getWeek'
//import getYearEnd from './../../helpers/getYearEnd'
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
    async removeItemRT({ commit }, { item, currentUserId }) {
      try {
        commit('updateLoadingStatusRT', true)
        await remove(ref(db, currentUserId + '/' + item.type + '/' + item.id))
        commit('updateLoadingStatusRT', false)
      } catch (error) {
        console.error('error realtime.js removeItemRT()', error)
      }
    },
    async updateItemRT({ commit }, { item, currentUserId }) {
      try {
        commit('updateLoadingStatusRT', true)
        await update(ref(db, currentUserId + '/' + item.type + '/' + item.id), item)
        commit('updateLoadingStatusRT', false)
      } catch (error) {
        console.error('error realtime.js updateItemRT()', error)
      }
    },

    // Получение Универсальное
    getItemsRT({ commit }, { type, currentUserId }) {
      try {
        commit('updateLoadingStatusRT', true)
        let itemsRef
        // if (limit) {
        //   itemsRef = query(ref(db, type), orderByChild('dateCreate'), limitToLast(limit))
        // } else {
        //   itemsRef = query(ref(db, type), orderByChild('dateCreate'))
        // }

        itemsRef = query(ref(db, currentUserId + '/' + type), orderByChild('dateCreate'))

        onValue(itemsRef, (snapshot) => {
          console.log('getItemsRT() run ', type)
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

    async addItemRT({ commit }, { item, currentUserId }) {
      try {
        commit('updateLoadingStatusRT', true)
        await set(ref(db, currentUserId + '/' + item.type + '/' + item.id), item)
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

    // serialNumber: state => {
    //   let number = +state.order.filter(item => item.dateCreateWeek === getWeek()).length + 1 || 1
    //   if (number < 10) {
    //     number = '0' + number
    //   } else if (number < 100) {
    //     number = '' + number
    //   }
    //   return getYearEnd() + getWeek() + number
    // },

    // parentOrder: state => id => state.task.find(item => item.id === id) || false
  }
}