
import { auth } from "@/main.js";
import { db } from "@/main.js";

export default {
  state: {
    napravs: [],
    projects: [],
    tasks: [],
    settings: JSON.parse(localStorage.getItem('settings')) || { showArhived: false, sortBy: 'date' }
  },
  mutations: {
    getItems(state, { type, items = [] }) {
      state[type] = items
    },
    addItem(state, item) {
      state[item.type].push(item)
    },
    removeItem(state, { id, type }) {
      state[type] = state[type].filter(item => item.id !== id)
    },
    updateItem(state, { id, title, type, active, date, color }) {
      const items = state[type].concat()
      const index = items.findIndex(el => el.id === id)
      let el = items[index]
      items[index] = { ...el, title, type, active, date, color }
      state[type] = items
    },
    updateSettings(state, { showArhived, sortBy }) {
      state.settings = { showArhived, sortBy }
      localStorage.setItem('settings', JSON.stringify(state.settings))
    }
  },
  actions: {
    getItems({ commit }, type) {
      let items = []
      const ref = db.collection("users").doc(auth.currentUser.uid)
      ref.collection(type).get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          items.push(doc.data())
        });
        commit('getItems', { type, items })
      });
    },
    addItem({ commit }, item) {
      const ref = db.collection("users").doc(auth.currentUser.uid)
      ref.collection(item.type).doc(item.id).set(item).then(() => {
        console.log('addItem, Элемент добавлен:', item);
        commit('addItem', item)
      }).catch(err => {
        console.log('addItem, Ошибка при добавлении документа:', err);
      })
    },
    removeItem({ commit }, { id, type }) {
      db.collection("users").doc(auth.currentUser.uid).collection(type).doc(id).delete().then(function () {
        console.log("removeItem, Document successfully deleted!");
        commit('removeItem', { id, type })
      }).catch(function (error) {
        console.error("removeItem, Error removing document: ", error);
      });
    },
    updateItem({ commit }, { id, title, type, active, date, color }) {
      const ref = db.collection("users").doc(auth.currentUser.uid)
      const el = ref.collection(type).doc(id).get().then(doc => doc.data())
      return ref.collection(type).doc(id).update({ ...el, title, type, active, date, color })
        .then(function () {
          console.log("updateItem, Document successfully updated!");
          commit('updateItem', { id, title, type, active, date, color })
        })
        .catch(function (error) {
          // The document probably doesn't exist.
          console.error("updateItem, Error updating document: ", error);
        });
    },
    updateSettings({ commit }, { showArhived, sortBy }) {
      commit('updateSettings', { showArhived, sortBy })
    }
  },
  getters: {
    napravs: state => state.napravs,
    projects: state => state.projects,
    tasks: state => state.tasks,
    settings: state => state.settings
  }
}
