
import { auth } from "@/main.js";
import { db } from "@/main.js";

export default {
  // state: {
  //   napravs: JSON.parse(localStorage.getItem('napravs') || '[]'),
  //   projects: JSON.parse(localStorage.getItem('projects') || '[]'),
  //   tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
  //   settings: JSON.parse(localStorage.getItem('settings')) || { showArhived: false, sortBy: 'date' }
  // },
  state: {
    napravs: [],
    projects: [],
    tasks: [],
    settings: JSON.parse(localStorage.getItem('settings')) || { showArhived: false, sortBy: 'date' }
  },
  mutations: {
    getItems(state, { type, items }) {
      state[type] = items
      console.log('state[', type, '] = ', items);

    },
    addItem(state, item) {
      state[item.type].push(item)

      let type = item.type
      console.log('type:', type);

      let batch = db.batch()
      let ref = db.collection("users").doc(auth.currentUser.uid).set({ type: state[item.type] })

      //localStorage.setItem(item.type, JSON.stringify(state[item.type]))
      //console.log('user id:', auth.currentUser.uid);
    },
    removeItem(state, { id, type }) {
      state[type] = state[type].filter(item => item.id !== id)
      localStorage.setItem(type, JSON.stringify(state[type]))
    },
    updateItem(state, { id, title, type, active, date, color }) {
      const items = state[type].concat()
      const index = items.findIndex(el => el.id === id)
      let el = items[index]
      items[index] = { ...el, title, type, active, date, color }

      state[type] = items
      localStorage.setItem(type, JSON.stringify(state[type]))
    },
    updateSettings(state, { showArhived, sortBy }) {
      state.settings = { showArhived, sortBy }
      localStorage.setItem('settings', JSON.stringify(state.settings))
    }
  },
  actions: {
    getItems({ commit }) {
      const ref = db.collection("users").doc(auth.currentUser.uid)
      ref.get().then(function (doc) {
        if (doc.exists) {
          console.log("getItems, Document data:", doc.data());
          commit('getItems', { type: 'napravs', items: doc.data().napravs })
          commit('getItems', { type: 'projects', items: doc.data().projects })
          commit('getItems', { type: 'tasks', items: doc.data().tasks })
        } else {
          // doc.data() will be undefined in this case
          console.log("getItems,No such document!");
        }
      }).catch(function (error) {
        console.log("getItems Error getting document:", error);
      });


    },
    addItem({ commit }, item) {
      commit('addItem', item)
    },
    removeItem({ commit }, { id, type }) {
      commit('removeItem', { id, type })
    },
    updateItem({ commit }, item) {
      commit('updateItem', item)
    },
    updateSettings({ commit }, { showArhived, sortBy }) {
      commit('updateSettings', { showArhived, sortBy })
    }
  },
  modules: {
  },
  getters: {
    napravs: state => state.napravs,
    projects: state => state.projects,
    tasks: state => state.tasks,
    settings: state => state.settings
  }
}
